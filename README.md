# Nekobook

[![banner](read_me/anime_cats.jpg)](https://nekobook.herokuapp.com/)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)
![last-commit](https://img.shields.io/github/last-commit/emikyu/nekobook)
![commit-activity](https://img.shields.io/github/commit-activity/m/emikyu/nekobook)
![repo-size](https://img.shields.io/github/repo-size/emikyu/nekobook)

A web application that lets nekos connect with other nekos.

[Nekobook](https://nekobook.herokuapp.com) is a cute web application that lets nekos connect with other nekos. The app is a mini-clone of the popular social media site [Facebook](https://facebook.com).

## Table of Contents

- [Technologies Used](#technology)
- [Key Features](#features)
    - [Neko Profiles](#profiles)
    - [Neko Friends](#friending)
    - [Neko Newsfeed](#newsfeed)
- [Code Snippets](#snippets)
- [License](#license)
- [Maintainers](#maintainers)

## Technology

This fullstack project was built through utilizing the following technologies:
* [Ruby on Rails](https://api.rubyonrails.org/)
* [Redux](https://redux.js.org/api/api-reference)
* [React](https://reactjs.org/docs/getting-started.html)
* [PostgreSQL](https://www.postgresql.org/)
* [AWS S3](https://docs.aws.amazon.com/s3/index.html)
* [Heroku](https://devcenter.heroku.com/categories/reference)

## Features

The hallmark Nekobook features highlighted in this section are:
1. [Neko Profiles](#profiles)
2. [Neko Friends](#friending)
3. [Neko Newsfeed](#newsfeed)

The following additional functionalities have also been implemented: user authentication and error handling, creation/deletion/modification of posts and comments (backbone to profile timeline and newsfeed), and neko friend search.

### Profiles
Each registered user has their own profile page, on which they can do the following:
- Update their profile picture and cover photo, and edit their 'Bio' and 'About' information
![Demo animation for updating profile picture and cover photo & editing bio/about information](read_me/edit_profile.gif)

- View their and other users' friends list on both the 'Timeline' and the 'Friends' pages of the respective user
![Demo animation for viewing friends on 'Timeline' and 'Friends' pages](read_me/view_friends.gif)

- Create/edit/delete their own posts/comments (either on their own wall or their friends' walls), or delete any posts/comments on their own wall
![Demo animation for CRUD actions involving posts/comments](read_me/posts_comments.gif)


### Friending
Users can establish friendships, which enables them to post/comment on each others' walls. Specifically, the following have been implemented for friending:
- Send/cancel outgoing friend requests through different avenues (e.g., navbar search results, profile page)
![Demo animation for sending/cancelling outgoing friend requests](read_me/outgoing_requests.gif)

- Confirm/delete incoming friend requests through different avenues (e.g., notifications, navbar search results, profile page)
![Demo animation for confirming/deleting incoming friend requests](read_me/incoming_requests.gif)

- Remove existing friends through different avenues (e.g., navbar search results, profile page)
![Demo animation for unfriending an existing friendship](read_me/unfriend.gif)


### Newsfeed
Users can see their and their friends' posts through the newsfeed feature, which appears upon logging onto Nekobook. The following actions are available:
- Create/edit/delete one's own posts/comments on the newsfeed


- Hiding/unhiding one's own / a friend's posts from appearing on the newsfeed

## Snippets

```
```

## Maintainers

[@emikyu](https://github.com/emikyu)


## License

© 2020 Emily Wu
