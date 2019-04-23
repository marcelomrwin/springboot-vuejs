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
      post {
          success {
              archiveArtifacts artifacts: '**/dependency-check-report.json', onlyIfSuccessful: true
              archiveArtifacts artifacts: '**/jacoco.exec', onlyIfSuccessful: true
              sh 'tar -czvf backend/target/sonar.tar.gz backend/target/sonar'
              archiveArtifacts artifacts: 'backend/target/sonar.tar.gz', onlyIfSuccessful: true

              sh 'tar -czvf backend/target/jacoco.tar.gz backend/target/site/jacoco'
              archiveArtifacts artifacts: 'backend/target/jacoco.tar.gz', onlyIfSuccessful: true

              sh 'tar -czvf backend/target/cobertura.tar.gz backend/target/site/cobertura'
              archiveArtifacts artifacts: 'backend/target/cobertura.tar.gz', onlyIfSuccessful: true
          }
      }
    }

    stage("publish to nexus") {
        steps {
            script {
                // Read POM xml file using 'readMavenPom' step , this step 'readMavenPom' is included in: https://plugins.jenkins.io/pipeline-utility-steps
                pom = readMavenPom file: "backend/pom.xml";
                // Find built artifact under target folder
                filesByGlob = findFiles(glob: "backend/target/*.${pom.packaging}");
                // Print some info from the artifact found
                echo "${filesByGlob[0].name} ${filesByGlob[0].path} ${filesByGlob[0].directory} ${filesByGlob[0].length} ${filesByGlob[0].lastModified}"
                // Extract the path from the File found
                artifactPath = filesByGlob[0].path;
                // Assign to a boolean response verifying If the artifact name exists
                artifactExists = fileExists artifactPath;
                if(artifactExists) {
                    echo "*** File: ${artifactPath}, group: ${pom.groupId}, packaging: ${pom.packaging}, version ${pom.version}";
                    nexusArtifactUploader(
                        nexusVersion: NEXUS_VERSION,
                        protocol: NEXUS_PROTOCOL,
                        nexusUrl: NEXUS_URL,
                        groupId: pom.groupId,
                        version: pom.version,
                        repository: NEXUS_REPOSITORY,
                        credentialsId: NEXUS_CREDENTIAL_ID,
                        artifacts: [
                            // Artifact generated such as .jar, .ear and .war files.
                            [artifactId: pom.artifactId,
                            classifier: '',
                            file: artifactPath,
                            type: pom.packaging],
                            // Lets upload the pom.xml file for additional information for Transitive dependencies
                            [artifactId: pom.artifactId,
                            classifier: '',
                            file: "backend/pom.xml",
                            type: "pom"]
                        ]
                    );
                } else {
                    error "*** File: ${artifactPath}, could not be found";
                }
            }
        }
    }

    stage('Deploy to Dev Wildfly'){
        steps {
          script {
            timeout(time: 5, unit: 'MINUTES') {
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
