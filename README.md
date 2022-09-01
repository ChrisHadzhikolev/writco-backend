# writco-backend
Fontys UAS Open Learning S7
# Project
I have interests in various domains, but this semester I decided to focus on the film industry(my second passion) for my personal project, so I will get right into it. I am a big fan of the process of creating a movie and all the different responsibilities. One particular area fascinates me the most: screenwriting and producing a combination of different aspects such as combining dialogue or scene with soundtrack. Therefore, I came up with an idea for a web app sort of community for such professionals within the film industry. 
## Description(Initial Concept):
The system will be based on two types of user roles for now - standard user and admin. Depending on how much time it takes and how the initial concept changes additional things might be added to the app.
### Target Audience:
The main target audience are the newcomers to the industry, so they can collaborate, give feedback to each other and improve. There is not a specific age group targeted as that part of the domain is not age-dependent. Finally, what is different about this is that it is more focused on people, who still haven’t made it or just have it as a hobby rather than career choice. Therefore the platform is not aiming to rival the professional more advanced software solutions already on the market and is more designed to be a community than individual workspace(even though individual workspace options are also a possibility for the users).
### Standard user: 
The standard user is another name for the creators, so they will use the main functionality of the app.
The first step will be creating an account, so that the app can associate it with their content.
#### Main User Functionalities that are planned currently:
Creating public and private articles - an article can be whatever the user desires might be a script, story etc.
Creating soundtracks - still not decided in what format they will be displayed(tbd after research)
Personalising their profile to be recognizable and unique
Following other users and interacting with them through comments or messages
Contacting “support” for issues with functionalities or claims of stolen or missing data
### Admin: 
The admin is in more of a maintainer role as well resolver of issues.
To be an admin you have to be added as such by another admin
#### Main Admin Functionalities that are planned currently:
User management system - managing users with options for banning etc., adding new user profiles, potentially inviting new users
Access to all user functionalities for testing purposes
Answering user support requests(might deviate into another role that handles support)
Maintenance system - monitoring the system
Adding new content for example adding new category that the users can put on an article 

### Technologies and general structure(Initial Concept):
The main structure will be backend services(microservices), api gateway, frontend, database, containerization, testing, versioning system and automatisation.
For now there are no plans for deploying, because cloud platforms are costly and this project is intended to not have a budget..
#### Functional Requirements:
Backend - NestJS(really comfortable for web apps)
Frontend - AngularJS with typescript(the focus is 70% on functionality and 30% on user experience and design)
Database - MySQL(using typeORM for connection and queries)
API Gateway - Additional security(tbd which gateway suits mostly the tech stack and app needs)
Containerization - Docker and Kubernetes(setup with helm charts and ingress)
Testing - Different types of testing with minimal coverage(as this project is limited to one day a week the goal is to show testability, but focus on functionality rather than just full coverage of the code), Sonarcloud, different tests (e2e, integration and performance)
Versioning system - GitHub
Automatisation - GitHub Actions pipelines(Sonarcloud code analyser and default build test push to docker pipeline) 
Local kubernetes environment - with minikube and lens
#### Non-functional Requirements:
Robustness - making it to work even, if unexpected error occurs
Maintainability - trying to have as little as possible hard-coded values in order to be adjusted by admin accounts instead of restarting the whole service
GDPR compliance - make sure the app is complying with the regulations and collects minimal user sensitive data
Security - taking in consideration OWASP top 10, applying additional security principles
Quality and Performance - researching and applying good coding practises, keeping the code clean and simple, commenting to further explain how things work 
Documentation - documenting how everything works and is structured, so that even a person with zero knowledge about the project can set up a local environment, test the features and be able to understand the architecture on high and low levels.
