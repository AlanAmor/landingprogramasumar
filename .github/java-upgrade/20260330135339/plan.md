# Upgrade Plan: webayudas (20260330135339)

- **Generated**: 2026-03-30 13:53
- **HEAD Branch**: main
- **HEAD Commit ID**: b0ec7b1

## Available Tools

**JDKs**
- JDK 26: C:\Program Files\Java\jdk-26\bin (current runtime, used for steps 2 baseline)
- JDK 25: **<TO_BE_INSTALLED>** (target LTS, required by steps 3 and 4)

**Build Tools**
- Maven 3.9.14: C:\apache-maven-3.9.14\bin (system)
- Maven Wrapper: 3.9.14 → **<TO_BE_UPGRADED>** to 4.0.x (Maven 4.0+ required for Java 25)
- maven-compiler-plugin: 3.12.1 (sufficient for Java 25 source/target)

## Guidelines

> Note: You can add any specific guidelines or constraints for the upgrade process here if needed, bullet points are preferred. <!-- this note is for users, NEVER remove it -->

## Options

- Working branch: appmod/java-upgrade-20260330135339 <!-- user specified, NEVER remove it -->
- Run tests before and after the upgrade: true <!-- user specified, NEVER remove it -->

## Upgrade Goals

- Upgrade Java from 23 to 25 (latest LTS)

### Technology Stack

<!--
  Table of core dependencies and their compatibility with upgrade goals.
  IMPORTANT: Analyze ALL modules in multi-module projects, not just the root module.
  Only include: direct dependencies + those critical for upgrade compatibility.
  CRITICAL: Identify and clearly flag EOL (End of Life) dependencies - these pose security risks and must be upgraded.

  Columns:
  - Technology/Dependency: Name of the dependency (mark EOL dependencies with "⚠️ EOL" suffix)
  - Current: Version currently in use
  - Min Compatible Version: Minimum version that works with upgrade goals (or N/A if replaced)
  - Why Incompatible: Explanation of incompatibility, or "-" if already compatible. For EOL deps, mention security/support concerns.

  IMPORTANT: Include build tools (Maven/Gradle), wrappers, and key build plugins in this table.
  Build tools and plugins are upgrade-critical even though they are not runtime dependencies.

  SAMPLE:
  | Technology/Dependency    | Current | Min Compatible | Why Incompatible                               |
  | ------------------------ | ------- | -------------- | ---------------------------------------------- |
  | Java                     | 8       | 21             | User requested                                 |
  | Spring Boot              | 2.5.0   | 3.2.0          | User requested                                 |
  | Spring Framework         | 5.3.x   | 6.1.x          | Spring Boot 3.2 requires Spring Framework 6.1+ |
  | Maven (wrapper)          | 3.6.3   | 3.9.0          | Maven 3.6.x does not support Java 21           |
  | maven-compiler-plugin    | 3.8.1   | 3.11.0         | Older versions cannot compile Java 21 bytecode |
  | maven-surefire-plugin    | 2.22.2  | 3.1.0          | Older versions may fail with Java 17+ module system |
  | Hibernate                | 5.4.x   | 6.1.x          | Spring Boot 3.x requires Hibernate 6+          |
  | javax.servlet ⚠️ EOL     | 4.0     | N/A            | Replaced by jakarta.servlet in Spring Boot 3.x; javax namespace EOL |
  | Log4j ⚠️ EOL             | 1.2.17  | N/A            | EOL since 2015, critical security vulnerabilities; replace with Logback/Log4j2 |
  | DWR ⚠️ EOL             | 3.0.1.rc  | N/A            | EOL since 2017, no longer maintained; consider replacing with modern alternatives |
  | Lombok                   | 1.18.20 | 1.18.20        | -                                              |
-->

| Technology/Dependency | Current | Min Compatible | Why Incompatible |
| --------------------- | ------- | -------------- | ---------------- |
| Java | 23 | 25 | User requested (upgrade to latest LTS) |
| Spring Boot | 4.0.4 | 4.0.4 | - (already compatible with Java 25) |
| Maven (system) | 3.9.14 | 4.0.0 | Maven 4.0+ required for full Java 25 support |
| Maven Wrapper | 3.9.14 | 4.0.0 | Maven 4.0+ required for full Java 25 support |
| maven-compiler-plugin | 3.12.1 | 3.12.1 | - (sufficient for Java 25 source/target) |
| spring-boot-starter-security | managed | managed | - |
| spring-boot-starter-web | managed | managed | - |
| spring-boot-starter-mail | managed | managed | - |
| h2 | managed | managed | - |

### Derived Upgrades

- Upgrade Maven Wrapper from 3.9.14 to 4.0.x (Maven 4.0+ required for Java 25; update `.mvn/wrapper/maven-wrapper.properties`)
- Update `java.version`, `maven.compiler.source`, `maven.compiler.target` in `pom.xml` from 23 to 25
- Update `maven-compiler-plugin` `<source>`/`<target>` configuration from 23 to 25

## Upgrade Steps

- **Step 1: Setup Environment**
  - **Rationale**: JDK 25 (target LTS) is not installed. JDK 26 is present but JDK 25 is needed to compile and run with the target LTS version.
  - **Changes to Make**:
    - [ ] Install JDK 25 (target LTS, required for steps 3–4)
    - [ ] Verify Maven wrapper is executable
  - **Verification**:
    - Command: `#appmod-list-jdks` to confirm JDK 25 installation
    - Expected: JDK 25 available

---

- **Step 2: Setup Baseline**
  - **Rationale**: Document current compile and test results with Java 23 / JDK 26 before any changes.
  - **Changes to Make**:
    - [ ] Run baseline compilation and tests with current JDK 26
    - [ ] Document pass/fail counts as acceptance criteria
  - **Verification**:
    - Command: `mvnw.cmd clean test-compile -q` then `mvnw.cmd clean test`
    - JDK: C:\Program Files\Java\jdk-26\bin
    - Expected: Document SUCCESS/FAILURE and test pass rate

---

- **Step 3: Upgrade Java to 25 and Update Maven Wrapper**
  - **Rationale**: Update all project Java version references to 25 and upgrade Maven wrapper to 4.0+ for Java 25 compatibility.
  - **Changes to Make**:
    - [ ] Update `<java.version>`, `<maven.compiler.source>`, `<maven.compiler.target>` to `25` in `pom.xml`
    - [ ] Update `maven-compiler-plugin` `<source>` and `<target>` to `25`
    - [ ] Update Maven wrapper `distributionUrl` in `.mvn/wrapper/maven-wrapper.properties` to Maven 4.0.x
    - [ ] Compile and fix any Java 25 compatibility issues
  - **Verification**:
    - Command: `mvnw.cmd clean test-compile -q` (using JDK 25)
    - JDK: JDK 25 path (from step 1)
    - Expected: Compilation SUCCESS (both main and test code)

---

- **Step 4: Final Validation**
  - **Rationale**: Verify all upgrade goals met, project compiles and all tests pass with JDK 25.
  - **Changes to Make**:
    - [ ] Verify all Java version references in `pom.xml` are set to 25
    - [ ] Resolve any remaining TODOs from previous steps
    - [ ] Run full test suite with JDK 25; fix all failing tests (iterative fix loop)
  - **Verification**:
    - Command: `mvnw.cmd clean test`
    - JDK: JDK 25 path
    - Expected: Compilation SUCCESS + 100% tests pass

## Key Challenges

- **Java 23 → 25 (Non-LTS to LTS)**: The jump from Java 23 to 25 may include removed preview features or deprecated API breakages. Since the project is a simple Spring Boot web app with no advanced Java APIs, risk is low.
  - **Strategy**: Compile immediately, fix any removed/changed API usages.
- **Maven 4.0 Wrapper Upgrade**: Maven 4.0 introduced new model version 4.1.0 but is backward compatible with POM model 4.0.0. The wrapper update simply changes which Maven binary is downloaded.
  - **Strategy**: Update `distributionUrl` only; keep `modelVersion 4.0.0` in pom.xml to avoid unnecessary changes.

## Plan Review

- All placeholders have been replaced.
- The project is a small Spring Boot 4.0.4 application with no complex dependencies — upgrade from Java 23 to 25 is low-risk.
- Maven 4.0 wrapper upgrade is straightforward and backward-compatible with the existing pom.xml.
- No unfixable limitations identified.
    - **Verification**:
      - Command: `mvn clean test -q` (if tests enabled) or `mvn clean test-compile -q` (if tests disabled)
      - JDK: <target JDK path>
      - Expected: Compilation SUCCESS + 100% tests pass (if tests enabled)
-->

## Key Challenges

<!--
  Document high-risk areas that require special attention during upgrade.
  Each challenge should have a mitigation strategy. Be concise.
  Common challenges:
  - Breaking API changes (javax→jakarta)
  - EOL library replacements
  - Complex multi-dependency coordination
  - Custom framework extensions that may break

  SAMPLE:
  - **Jakarta EE Namespace Migration**
     - **Challenge**: Entire codebase uses javax.* packages (servlet, persistence, validation, inject, mail) that must migrate to jakarta.* in Spring Boot 3+.
     - **Strategy**: Use OpenRewrite's automated migration recipes after reaching Spring Boot 2.7.x to handle bulk namespace changes. Spring Boot 2.7.x provides javax-to-jakarta bridge making it ideal intermediate target.
  - **Hibernate 4.3 to 6.x Major Version Jump**
     - **Challenge**: Breaking changes in Hibernate 6 including removed APIs, behavior changes, and updated query syntax.
     - **Strategy**: Upgrade incrementally: Hibernate 5.6.x with Spring Boot 2.7.x, validate, then Hibernate 6.x with Spring Boot 3.2.x. Update jackson-datatype-hibernate4 → hibernate6 module. Expect schema validation and query adjustments.
-->
