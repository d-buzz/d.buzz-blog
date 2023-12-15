# D.Buzz Blog Frontend

## Introduction to D.Buzz Blog

### D.Buzz Blog: A New Era of Social Blogging on the Hive Blockchain

D.Buzz Blog is an innovative social blogging platform that reimagines online social interaction. Built on the Hive blockchain, it stands out for its decentralized nature and focus on user empowerment. Unlike conventional blogging platforms, D.Buzz Blog prioritizes freedom of speech and privacy, utilizing blockchain technology to enhance user experience.

#### Key Features:

- **Decentralization:** DBuzz Blog operates without a central authority, promoting free expression and minimizing censorship, thanks to its Hive blockchain foundation.
- **Content Monetization:** Users can earn Hive tokens through their content, providing a unique way to gain rewards for their creative efforts.
- **Community Governance:** With a stake-based governance system, users holding more Hive tokens have a greater say in content moderation and platform direction.
- **Transparency and Security:** Leveraging blockchain technology, D.Buzz Blog ensures secure and transparent record-keeping of all interactions.
- **User-Friendly Interface:** Despite its advanced backend, D.Buzz Blog offers an interface similar to mainstream blogging platforms, complete with familiar features.
- **Hive Integration:** Being part of the Hive ecosystem, the platform smoothly integrates with Hive, enhancing the experience for blockchain enthusiasts.

#### Conclusion:

D.Buzz Blog represents a significant development in the intersection of social media and blockchain technology, offering a platform where user rights, creativity, and secure, transparent governance are key. It's an exciting step forward for those seeking a more decentralized and rewarding social blogging experience.

# D.Buzz Blog Frontend

This is the frontend codebase that powers the D.Buzz Blog platform. It is built using React and Redux.

## Overview and Main Pages

The project's frontend is structured around several key pages, each serving a distinct purpose within the D.Buzz Blog platform:

- **Home (`Home`)**: This is the main landing page component. For authenticated users, it displays the latest posts from the people they follow. For guests, it shows trending posts across the platform.
- **Profile (`Profile`)**: The user profile page provides detailed information about users, including their posts, replies, and settings. It also includes sub-routes for additional profile-related views.
- **Search (`Search`)**: This page allows users to search for posts and other users on the platform, providing a search results page to display the findings.
- **Content (`Content`)**: A detailed view for individual posts or comments, including the ability to view and post replies.

The frontend utilizes Redux for global state management, with Sagas handling data fetching asynchronously. React Router is employed for navigation and routing across the platform, ensuring users can smoothly transition between pages. Additionally, the `components/` directory contains reusable UI components that are utilized throughout the application to maintain a consistent look and feel.

## Data Fetching

Data is fetched from the D.Buzz Blog API endpoints using Redux Sagas. The main requests are handled in `services/api.js`, which contains the API calls to the D.Buzz Blog server. These calls are made to the D.Buzz Blog endpoint server which provides the necessary API calls that are not available through the standard Hive blockchain API.

The API calls include fetching posts, comments, user profiles, and other related data. The `SEARCH_API` uses the D.Buzz Blog endpoint server to provide the necessary API calls that are not available through the standard Hive blockchain API. The data is retrieved using JSON-RPC calls over HTTP to `rpc.d.buzz`. The responses from these calls are then processed and managed within the Redux store, with related actions and reducers located in `store/*.js`.

The `services/api.js` file abstracts the complexity of direct blockchain interactions and provides simple methods that are used throughout the application to request and receive data from the Hive blockchain.

## Components

Reusable components are located in `components/`. This includes common UI elements in `elements/` as well as core containers like:

### Pages
- `Feeds` - The feed page showing posts from followed users.
- `Latest` - Displays the latest posts across the platform.
- `News` - Shows news-related posts.
- `Hive` - Displays posts from the Hive blockchain.
- `Trending` - Lists trending posts based on user interactions.
- `Tags` - Shows posts associated with specific tags.
- `Search` - Allows users to search for posts and other users on the platform.
- `Profile` - The user profile page with detailed information and sub-routes.
- `Content` - A detailed view for individual posts or comments.
- `Post` - The page for creating new posts.
- `Notification` - Displays notifications for the user.
- `Landing` - The landing page for new or unauthenticated users.

### Common
- `HelmetGenerator` - Manages changes to the document head.
- `InfiniteList` - Infinite scroll post list.
- `PostList` - Display list of posts.
- `ReplyList` - Display list of replies.
- `MarkdownViewer` - Renders markdown content.
- `PostTags` - Displays tags for a post.
- `Avatar` - Displays user avatars.
- `Spinner` - Loading spinner animation.
- `ContainedButton` - A styled button component.
- `Skeleton` - Placeholder for loading content.
- `ContentSkeleton` - Placeholder for loading post content.
- `ReplyListSkeleton` - Placeholder for loading replies.

### Other
- `ImagesContainer` - Container for displaying images in a post.
- `ReplyContent` - Component for displaying a single reply.

## Styling

The site uses JSS for styling components. The main theme file with base styles is `services/theme.js` and components define styles using `react-jss`.

## Development

To run locally:

```
yarn install
yarn start
```

This will start the dev server at http://localhost:3000.

To run tests:

```
yarn test
```

This will execute the test suite and output the results.

## Contributing

We warmly welcome community contributions to D.Buzz Blog. Whether it's reporting bugs, suggesting enhancements, or submitting pull requests for bug fixes and new features, your involvement is invaluable to the project.

### How to Contribute:

1. **Clone and Branch:** Start by cloning the `dev` branch: `git clone -b dev https://github.com/d-buzz/d.buzz-blog.git`. Create a local branch for your contributions.
2. **Develop and Test:** Make your changes and test them thoroughly. Please adhere to the coding conventions and guidelines as outlined in our documentation.
3. **Open a Pull Request (PR):** Once you're ready, open a PR against the `dev` branch. Ensure your PR description clearly explains your changes or the issue it resolves.
4. **Review Process:** Your PR will be reviewed by the maintainers. This process ensures that the codebase remains consistent and that the quality of the project is maintained.
5. **Deployment:**
- **Testnet:** Changes merged into the `dev` branch will be deployed to the `testnet` branch for beta testing.
- **Mainnet:** Once we confirm the stability of the changes on `testnet`, they will be merged into the `stable` branch and subsequently deployed to the `mainnet` for production.

### Guidelines:

- **Issues and Pull Requests:** Before creating new issues or pull requests, please check existing ones to avoid duplicates.
- **Commit Messages:** Follow our commit message conventions for clarity. [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).
- **Code Style:** Ensure your code follows the established style of the project to maintain consistency.

### Community Engagement:

- Join the conversation: For any questions, support, or bug reporting, visit our [community chat](https://chat.d.buzz).
- Stay Informed: Keep up with the latest developments and participate in discussions.

Your contributions, big or small, play a significant part in the evolution of D.Buzz Blog. We thank you for your support and enthusiasm!

## License

This project is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

For more information, please refer to <http://unlicense.org/>

## Contact, Support, and Reporting Issues

For any questions, support issues, or to report bugs with the platform, please visit our chat at <https://chat.d.buzz>. We appreciate your contributions to improving D.Buzz Blog.
