import React from "react";

function HomeComponent() {
  return (
    <div className="home-container">
      <h1 className="home-title">Billing Project ✨</h1>
      <p className="home-description">
        The Billing Project is a web application designed to transmit
        electricity indexes and generate invoices for signed-up users. It serves
        as the frontend for the ElectricityBilling project, which provides the
        backend functionality using Java and Spring Boot.
      </p>
      <p className="home-description">
        This project is built using React and aims to facilitate learning and
        development of frontend skills. It serves as a practical learning
        experience, exploring various concepts and techniques commonly used in
        React development.
      </p>
      <h2 className="home-subtitle">Key Features 🚀</h2>
      <ul className="home-list">
        <li>
          User sign-up and authentication: Users can create an account and
          authenticate themselves to access the application.
        </li>
        <li>
          Index transmission: Users can submit their electricity indexes through
          the application.
        </li>
        <li>
          Invoice generation: The application generates invoices based on the
          transmitted indexes.
        </li>
        <li>
          Integration with the backend: The frontend communicates with the
          backend API of the ElectricityBilling project to retrieve and send
          data.
        </li>
      </ul>
      <h2 className="home-subtitle">Technology Stack - Frontend</h2>
      <ul className="home-list">
        <li>
          React: The JavaScript library used for building the user interface.
        </li>
        <li>
          Vite: A fast and lightweight development server and build tool for
          modern web applications.
        </li>
        <li>
          Node.js: A runtime environment that allows server-side execution of
          JavaScript code.
        </li>
        <li>
          TypeScript: A typed superset of JavaScript that adds static typing and
          tooling support.
        </li>
        <li>
          JavaScript: The programming language for adding interactivity to the
          application.
        </li>
        <li>HTML: The markup language for structuring the application.</li>
        <li>
          CSS: The style sheet language for designing the application's
          appearance.
        </li>
        <li>
          React Router: A library for handling routing in React applications.
        </li>
        <li>Axios: A popular HTTP client library for making API requests.</li>
        <li>
          Bootstrap: A CSS framework for building responsive and modern web
          pages.
        </li>
        <li>
          Font Awesome: A library of scalable vector icons that can be easily
          customized.
        </li>
        <li>
          Date-fns: A library for manipulating and formatting dates in
          JavaScript.
        </li>
      </ul>
      <h2 className="home-subtitle">Technology Stack - Backend</h2>
      <p className="home-description">
        The ElectricityBilling Backend is built using the following technologies
        and tools:
      </p>
      <ul className="home-list">
        <li>Java 17: The programming language used for development.</li>
        <li>
          Spring Boot: The framework used for building the backend application.
        </li>
        <li>
          Maven: The build automation tool and dependency management system.
        </li>
        <li>
          PostgreSQL Docker: The containerized database used for storing data.
        </li>
        <li>
          Spring Security: The security framework used for user authentication
          and authorization.
        </li>
        <li>
          Flyway: The database migration tool used to manage database schema
          updates.
        </li>
        <li>
          JWT Authentication: The authentication mechanism used for securing the
          APIs.
        </li>
        <li>
          MapStruct: The Java-based code generation library used for mapping
          between objects.
        </li>
        <li>JUnit 5: The testing framework used for unit testing.</li>
      </ul>
      <h2 className="home-subtitle">Getting Started - Frontend 🛠️</h2>
      <p className="home-description">
        To run the Billing Project on your local machine, follow these steps:
      </p>
      <ol className="home-list">
        <li>Ensure that you have Node.js and npm installed on your machine.</li>
        <li>Clone the ElectricityBilling project repository.</li>
        <li>
          Install the project dependencies by running npm install in the project
          directory.
        </li>
        <li>Start the development server by running npm start.</li>
        <li>
          Access the application in your browser at{" "}
          <a href="http://localhost:5173">http://localhost:5173</a>.
        </li>
      </ol>
      <h2 className="home-subtitle">Getting Started - Backend 🛠️</h2>
      <p className="home-description">
        To set up and run the ElectricityBilling Backend on your local machine,
        follow these steps:
      </p>
      <ol className="home-list">
        <li>Make sure you have Java 17 and Maven installed on your machine.</li>
        <li>Clone the ElectricityBilling Backend repository.</li>
        <li>
          Set up the PostgreSQL Docker container and configure the database
          connection.
        </li>
        <li>
          Run the database migrations using Flyway to set up the required
          database schema.
        </li>
        <li>Build the project using Maven: mvn clean install.</li>
        <li>Start the backend server: mvn spring-boot:run.</li>
      </ol>
      <p className="home-description">Additional Notes 📝</p>
      <p className="home-description">
        - This project will continue to evolve as the application develops and
        as I further enhance my frontend skills.
      </p>
    </div>
  );
}

export default HomeComponent;
