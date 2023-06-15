# AkuMau-Project

## About this app
AkuMau is an online learning application to prepare for UTBK-SNBT. This application provides UTBK-SNBT questions and answer’s explanations from previous years and predictions of questions that will be tested on UTBK-SNBT in the future. In addition, this application also provides learning materials and several features such as try-out feature to train students' abilities, discussion forum feature to discuss with other students, and recommendation feature to recommend materials that must be studied by students based on incorrect answers and based on predictions of UTBK-SNBT in the future.

## Features
* a
* b
* c
* d

## Architecture Design
(pic)

## Workflow

1. **User Registration and Authentication**
   - Users can register and log in using email/password or social media accounts (Google, Facebook).
   - Firebase Authentication handles user authentication.

2. **User Profile Setup**
   - Users set up their profile, including basic information and preferences.
   - User profile data is stored in Firebase Firestore.

3. **Browsing and Searching Courses**
   - Users can browse and search for courses by category or topic.
   - Mobile app (Kotlin) connects to the server-side API.

4. **Enrolling in Courses**
   - Users can enroll in courses and track their progress.
   - Enrollments are stored in Firebase Firestore.

5. **Course Content and Learning Materials**
   - Users access lessons, videos, quizzes, and interactive materials.
   - TensorFlow handles machine learning tasks.

6. **Tracking Progress and Achievements**
   - Users track course progress, quiz scores, and earn achievements.

7. **Cloud Storage and Content Management**
   - Files and resources are stored in Google Cloud Storage.
   - Google Cloud App Engine handles cloud infrastructure.

8. **Server-side APIs and Data Management**
   - Node.js and Express.js provide server-side APIs.
   - CloudSQL (MySQL) stores course and user data.

9. **Deployment and Scaling**
    - App deployed on Google Cloud Platform (App Engine).
    - Docker enables containerization.

10. **Monitoring**
    - Google Cloud Platform provides monitoring and analytics tools.


## Technology Stack

The AkuMau project is created using the following technology stack:

1. Kotlin for mobile app development
2. TensorFlow for machine learning tasks
3. Google Cloud App Engine for cloud infrastructure
4. Node.js and Express.js for server-side development
5. CloudSQL using MySQL as the database
6. Firebase for authentication and authorization
7. Docker for containerization of the application

## Setup and Deployment

### 1. Kotlin for mobile app development

To develop the mobile app using Kotlin:

- Install Android Studio, which includes the Kotlin plugin.
- Create a new Android project in Android Studio.
- Set up the necessary dependencies and configurations for your project.
- Write Kotlin code to implement the desired features and functionality.
- Test the app on an emulator or physical device.
- Build and distribute the app to users through the Google Play Store or other distribution channels.

### 2. TensorFlow for machine learning tasks

To use TensorFlow for machine learning tasks:

- Install TensorFlow by adding the necessary dependencies to your project's build files.
- Define and implement the machine learning models using TensorFlow's APIs.
- Train the models using appropriate datasets and optimization techniques.
- Evaluate and fine-tune the models based on performance metrics.
- Integrate the trained models into your mobile app or backend system to make predictions or perform desired tasks.

### 3. Google Cloud App Engine for cloud infrastructure

To deploy your application using Google Cloud App Engine:

- Install the Google Cloud SDK and set up your GCP project.
- Configure your App Engine settings in the `app.yaml` file, including the runtime environment, scaling options, and other configurations.
- Use the `gcloud app deploy` command to deploy your application to App Engine.
- Monitor and manage your deployed application using the App Engine dashboard or command-line tools.
- Scale your application as needed to handle increasing traffic or load.

### 4. Node.js and Express.js for server-side development

To develop the server-side components using Node.js and Express.js:

- Install Node.js on your development machine.
- Create a new Node.js project or navigate to an existing project directory.
- Set up the necessary dependencies by configuring the `package.json` file.
- Write server-side logic using Express.js, defining routes, middleware, and business logic.
- Test the server-side code using appropriate testing frameworks or tools.
- Deploy the Node.js application to a hosting provider or cloud platform for production use.

### 5. CloudSQL using MySQL as the database

To set up CloudSQL with MySQL for your project:

- Create a CloudSQL instance in the Google Cloud Console.
- Configure the instance settings, including the instance type, storage capacity, and backup options.
- Create a database within the CloudSQL instance.
- Connect to the CloudSQL instance using the provided connection details (host, port, username, password).
- Use SQL statements or an ORM (Object-Relational Mapping) library to interact with the MySQL database.
- Secure the database by implementing appropriate access controls and encryption.

### 6. Firebase for authentication and authorization

To set up authentication and authorization using Firebase:

- Create a Firebase project in the Firebase console.
- Enable the Authentication service and configure the desired authentication providers (e.g., email/password, Google, Facebook).
- Implement the necessary client-side code to handle user authentication, such as sign-up, sign-in, and password reset.
- Define and enforce authorization rules to control access to specific resources or functionalities.
- Test the authentication and authorization flows to ensure they function as intended.
- Monitor and manage user authentication and authorization through the Firebase console or APIs.

### 7. Docker for containerization of the application

To containerize your application using Docker:

- Install Docker on your development machine.
- Create a Dockerfile in the project directory to define the application's dependencies, build process, and runtime configuration.
- Build the Docker image using the `docker build` command.
- Run the Docker container locally to verify that the application functions correctly.
- Push the Docker image to a container registry or Docker Hub.
- Deploy the Docker image to a container orchestration platform, such as Kubernetes, for production use.

Make sure to adjust the instructions above based on your specific project requirements and configurations. Provide clear explanations and include any necessary command-line instructions or code snippets to guide readers through the setup and implementation process.


## Our team member
| Member Name              | Student ID  | Learning Path      | LinkedIn Profile                                                                |
|--------------------------|-------------|--------------------|---------------------------------------------------------------------------------|
| Andi Agung Kahfi         | C038DSX0933 | Cloud Computing    | [Andi Agung Kahfi](https://www.linkedin.com/in/agkahfi)                         |
| Insan Kamil Ramadhani    | C038DSX3020 | Cloud Computing    | [Insan Kamil Ramadhani](https://www.linkedin.com/in/insan-kamil-0425)           |
| Agung Handayanto         | M038DSX1836 | Machine Learning   | [Agung Handayanto](https://id.linkedin.com/in/agung-handayanto-236895220)       |
| Ahmad Luthfi Azmi Haikal | M151DSX2569 | Machine Learning   | [Ahmad Luthfi Azmi Haikal](https://id.linkedin.com/in/alahaikal)                |
| Maulana Aziz Arrazi      | M181DSX3225 | Machine Learning   | [Maulana Aziz Arrazi](https://id.linkedin.com/in/maulana-aziz-arrazi-9890241b8) |
| Ahmad Zuhal Zhafran      | A151DSX3392 | Mobile Development | [Ahmad Zuhal Zhafran](https://id.linkedin.com/in/maulana-aziz-arrazi-9890241b8) |

## Monitoring
test1
## License
Distributed under the MIT License. See `LICENSE` for more information.


