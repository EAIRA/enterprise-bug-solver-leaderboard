# Enterprise Bug Solver Leaderboard

## Overview

This project aims to create a leaderboard for evaluating how well different Generative AI models can solve bugs from modern enterprise codebases. While projects like SWE-bench focus on Python, we target languages and frameworks commonly used in the banking, insurance, and retail industries.

## Motivation

Enterprise software often uses different languages, frameworks, and architectures compared to academic based open-source projects. By creating a benchmark focused on enterprise-level bugs, we can:

1. Better evaluate AI models for real-world enterprise use cases
2. Highlight areas where AI excels or struggles with complex, domain-specific code
3. Drive improvements in AI capabilities for enterprise software development

## Key Features

- Bug dataset from real enterprise codebases (anonymized as needed)
- Focus on languages like Java, C, and C#. However, Java will be the first focus area.
- Wehope to include popular enterprise frameworks (Spring, Jakarta, etc.).
- Evaluation metrics tailored for enterprise contexts (e.g., compliance, scalability)
- Leaderboard tracking the performance of different AI models and versions

## Dataset

We're building a diverse dataset of bugs from enterprise codebases. Each bug entry includes:

- Buggy code snippet
- Correct fix
- Relevant context (e.g., framework version, dependencies)
- Test cases to validate fixes
- Difficulty rating and categorization

## Evaluation Process

1. AI models are presented with the buggy code and relevant context
2. Models generate proposed fixes
3. Fixes are automatically tested against provided test cases
4. Additional metrics (code style, performance impact, etc.) are evaluated
5. Results are aggregated, and models are ranked on the leaderboard

## Contributing

We welcome contributions from both industry and academia:

- Submit anonymized bug/fix pairs from enterprise projects
- Implement evaluation for new languages or frameworks
- Add support for testing additional AI models
- Suggest improvements to evaluation metrics

Please see CONTRIBUTING.md for more details.

## Future Work

- Incorporate domain-specific evaluation (financial calculations, security practices)
- Develop tooling to help enterprises benchmark AI on their private codebases

## Resource Links

[SWEBench](https://www.swebench.com/)   
[Bugs-dot-jar](https://github.com/bugs-dot-jar/bugs-dot-jar)   
[Bugs-dot-jar Paper](https://cs.gmu.edu/~winglam/publications/2018/bugs-dot-jar.pdf)

## License

(TBD)

---

This README provides a high-level overview of the project, its goals, and key components. Depending on the specific implementation and focus areas you decide on, you may want to expand on certain sections or add additional details.
