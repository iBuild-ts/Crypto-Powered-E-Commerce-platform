// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title PaymentEscrow
 * @dev Smart contract for secure buyer-seller transactions with escrow
 */
contract PaymentEscrow is Ownable, ReentrancyGuard {
    // Supported stablecoins
    address public usdcToken;
    address public usdtToken;

    // Escrow state
    struct Escrow {
        address buyer;
        address seller;
        uint256 amount;
        address token;
        uint256 timestamp;
        bool released;
        bool disputed;
    }

    mapping(bytes32 => Escrow) public escrows;
    mapping(address => uint256) public sellerBalance;

    // Events
    event EscrowCreated(
        bytes32 indexed escrowId,
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        address token
    );

    event EscrowReleased(bytes32 indexed escrowId, address indexed seller);
    event EscrowDisputed(bytes32 indexed escrowId);
    event EscrowResolved(bytes32 indexed escrowId, address indexed winner);
    event WithdrawalProcessed(address indexed seller, uint256 amount);

    constructor(address _usdc, address _usdt) {
        usdcToken = _usdc;
        usdtToken = _usdt;
    }

    /**
     * @dev Create an escrow for a transaction
     */
    function createEscrow(
        address seller,
        uint256 amount,
        address token
    ) external nonReentrant returns (bytes32) {
        require(seller != address(0), "Invalid seller address");
        require(amount > 0, "Amount must be greater than 0");
        require(
            token == usdcToken || token == usdtToken,
            "Unsupported token"
        );

        // Transfer tokens from buyer to contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Create escrow ID
        bytes32 escrowId = keccak256(
            abi.encodePacked(msg.sender, seller, amount, block.timestamp)
        );

        // Store escrow
        escrows[escrowId] = Escrow({
            buyer: msg.sender,
            seller: seller,
            amount: amount,
            token: token,
            timestamp: block.timestamp,
            released: false,
            disputed: false
        });

        emit EscrowCreated(escrowId, msg.sender, seller, amount, token);
        return escrowId;
    }

    /**
     * @dev Release funds to seller (called by buyer)
     */
    function releaseEscrow(bytes32 escrowId) external nonReentrant {
        Escrow storage escrow = escrows[escrowId];
        require(escrow.buyer == msg.sender, "Only buyer can release");
        require(!escrow.released, "Already released");
        require(!escrow.disputed, "Escrow is disputed");

        escrow.released = true;
        sellerBalance[escrow.seller] += escrow.amount;

        emit EscrowReleased(escrowId, escrow.seller);
    }

    /**
     * @dev Dispute an escrow (called by buyer or seller)
     */
    function disputeEscrow(bytes32 escrowId) external {
        Escrow storage escrow = escrows[escrowId];
        require(
            msg.sender == escrow.buyer || msg.sender == escrow.seller,
            "Not authorized"
        );
        require(!escrow.released, "Cannot dispute released escrow");

        escrow.disputed = true;
        emit EscrowDisputed(escrowId);
    }

    /**
     * @dev Resolve a dispute (called by owner/admin)
     */
    function resolveDispute(bytes32 escrowId, address winner)
        external
        onlyOwner
        nonReentrant
    {
        Escrow storage escrow = escrows[escrowId];
        require(escrow.disputed, "Not disputed");
        require(
            winner == escrow.buyer || winner == escrow.seller,
            "Invalid winner"
        );

        if (winner == escrow.seller) {
            sellerBalance[escrow.seller] += escrow.amount;
        } else {
            // Refund to buyer
            IERC20(escrow.token).transfer(escrow.buyer, escrow.amount);
        }

        escrow.released = true;
        emit EscrowResolved(escrowId, winner);
    }

    /**
     * @dev Withdraw seller balance
     */
    function withdrawBalance(address token) external nonReentrant {
        uint256 balance = sellerBalance[msg.sender];
        require(balance > 0, "No balance to withdraw");

        sellerBalance[msg.sender] = 0;
        IERC20(token).transfer(msg.sender, balance);

        emit WithdrawalProcessed(msg.sender, balance);
    }

    /**
     * @dev Get escrow details
     */
    function getEscrow(bytes32 escrowId)
        external
        view
        returns (Escrow memory)
    {
        return escrows[escrowId];
    }

    /**
     * @dev Get seller balance
     */
    function getSellerBalance(address seller)
        external
        view
        returns (uint256)
    {
        return sellerBalance[seller];
    }
}
