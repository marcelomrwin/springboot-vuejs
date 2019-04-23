def version = null
def artifactId = null
def groupId = null
def pom = null

pipeline{
  agent {
    label "maven"
  }

  tools {
    maven "M3"
  }

  environment {
    NEXUS_VERSION = "nexus3"
    NEXUS_PROTOCOL = "https"
    NEXUS_URL = "10.1.123.207"
    NEXUS_REPOSITORY = "company-project"
    NEXUS_CREDENTIAL_ID = "jenkinsldap"
    MAX_WARNING_VIOLATIONS = 30
  }

  options {
    // Only keep the 10 most recent builds
    buildDiscarder(logRotator(numToKeepStr:'10'))
  }

  stages{
    stage('Poll'){
        steps {
          script{
            checkout scm
            version = getVersionFromPom()
            groupId = getGroupIdFromPom()
            artifactId = getArtifactIdFromPom()
            pom = readMavenPom file: "pom.xml";
          }
        }
    }

    stage('Build & Unit test'){
        steps {
          script {
            sh 'mvn --projects backend clean verify -DskipITs=true -Pjar';
            junit '**/target/surefire-reports/TEST-*.xml'
          //  archive 'target/*.jar'
          }
        }
    }

    stage('SonarQube Static Code analysis') {
      steps {
        withMaven( maven: 'M3', mavenSettingsConfig: 'maven-settings',
        options: [
          artifactsPublisher(disabled: true),
          findbugsPublisher(disabled: false),
          openTasksPublisher(disabled: false),
          junitPublisher(disabled: false)
        ]) {
          withSonarQubeEnv('SonarQube') {
            sh "mvn clean verify sonar:sonar -pl !frontend -Dsonar.login=admin -Dsonar.password=admin -Dsonar.verbose=true -Dsonar.projectName=${groupId}:${artifactId} -Dsonar.projectKey=${groupId}:${artifactId} -Dsonar.dependencyCheck.reportPath=target/dependency-check-report.xml -Dsonar.dependencyCheck.htmlReportPath=target/dependency-check-report.html -Dcobertura.report.format=html -Dsonar.cobertura.reportPath=target/cobertura/coverage.html -Dsonar.projectVersion=$BUILD_NUMBER";
          }
        }
      }
    }

    stage("Fetch Quality Gate") {
      steps{
        script{
          timeout(time: 5, unit: 'MINUTES') {
            def qg = waitForQualityGate()
            if (qg.status != 'OK') {
              error "Falha devido a má qualidade do código.\nStatus da análise: ${qg.status}"
            }
          }
        }
      }
    }

    stage('Deploy to Dev Wildfly'){
        steps {
          script {
            timeout(time: 5, unit: 'MINUTES') {
              sh 'mvn clean package -Pdeploy-domain -DskipTests';
              sh 'mvn --projects backend wildfly:undeploy wildfly:deploy -Pdeploy-domain -DskipTests';
            }
          }
        }
    }

  }
  post {
    always {
      echo "Send notifications for result: ${currentBuild.result}"
    }
  }
}
