# Crystalline ⭐ - Truth Seekers Network (Blockchain Edition)

An uncensorable, decentralized platform for survivors and truth seekers. Built on Polygon blockchain with Next.js and Three.js.

## ✨ Features

- **Blockchain-Based**: Posts stored permanently on Polygon blockchain
- **Encrypted Content**: All posts are encrypted before storage
- **Community Validation**: Posts grow stronger with community support
- **Visual Feedback**: 3D crystal visualizations respond to validations/disputes
- **Anonymous Posting**: Option to post anonymously while maintaining transparency
- **Panic Button**: Emergency exit feature for safety
- **Pattern Matching**: Find others with similar experiences (coming soon)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MetaMask wallet extension
- Some MATIC tokens on Polygon network (for posting)

### Installation

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### First Time Setup

1. Make sure MetaMask is installed and connected to Polygon network
2. Click "Connect Wallet" button
3. You're ready to start posting!

## 📝 How It Works

### Creating Posts

1. Click "New Post" button
2. Write your content
3. Choose anonymous or public posting
4. Pay 0.001 MATIC (90% funds free posts, 10% platform maintenance)
5. Post is encrypted and stored on blockchain forever

### Validating/Disputing Posts

- **Validate**: Support posts that resonate with your experience
- **Dispute**: Challenge posts with explanation
- Crystal visualizations change based on community feedback

### Revenue Model

- Paid posts: 0.001 MATIC
- 90% → Funds free posts for those who can't afford
- 10% → Platform maintenance and development

## 🔧 Technical Details

### Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber
- **Blockchain**: Ethers.js, Polygon Network
- **Smart Contract**: Deployed at `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`

### Smart Contract Functions

- `createPost(encryptedContent, contentHash)` - Create new post
- `validatePost(postId)` - Support a post
- `disputePost(postId, reason)` - Challenge a post
- `getPost(postId)` - Retrieve post data
- `getPostCount()` - Total number of posts

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Deploy!

No environment variables needed - everything runs client-side.

## 🔒 Security & Privacy

- Content is encrypted before blockchain storage
- Wallet address is visible but can post anonymously
- Panic button for emergency exit
- No centralized server - fully decentralized

## 🎨 Customization

### Changing Contract Address

Edit `app/page.tsx` and update:
```typescript
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS'
```

### Modifying Colors

Edit `tailwind.config.js` to change the crystal color scheme.

### Adjusting Posting Fee

Edit the `handleCreatePost` function in `app/page.tsx`:
```typescript
value: ethers.parseEther('0.001') // Change amount here
```

## 📱 Browser Support

- Chrome/Brave (recommended with MetaMask)
- Firefox (with MetaMask)
- Safari (limited - MetaMask mobile app)

## 🤝 Contributing

This is a community-driven project. Suggestions and feedback welcome!

## 📄 License

Open source - use responsibly and ethically.

## 🆘 Support

For issues or questions, create an issue on GitHub or reach out to the community.

---

**Remember**: This platform is designed for survivors and truth seekers. Use it responsibly, support others, and help create a safe space for those who need it.

💎 Truth crystallizes when we support each other 💎
