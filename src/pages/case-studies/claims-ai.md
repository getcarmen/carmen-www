---
layout: ../../layouts/Page.astro
title: "Supercharge Medical Claims Review with AI"
description: "A guide to leveraging AI for the Medical Claims Review Process. Our Claims AI Agent serves revenue operations specialists with the policy expertise they need to process claims with accuracy and scale."
date: 2025-10-28
tags: ["MCP", "Claude", "healthcare", "datalab", "oxen"]
author: "Graham Thompson, Carmen AI"
---

![Claude Desktop Interface for Claims Processing](/case-studies/img/claude-prompt.png)

Imagine having an employee who can instantly recall every detail buried deep inside 5,000 pages of medical policy documents, cite specifics, and make a claim recommendation in a matter of seconds.

This is the reality we've built using the power of AI.

This article walks through how we transformed a manual, time-intensive claims review process into an intelligent, automated system that processes claims in real-time while maintaining detailed audit trails. More importantly, it demonstrates the capabilities of AI to tackle similar data-intensive challenges in your organization.

**Project Assumptions:**
1. Our claims data is complete, nicely formatted, and error-free
2. We generated fake claims using a defined schema
3. Only BCBS medical policies included (UHC, Aetna, etc. excluded to limit scope)
4. Production deployment would require additional data validation and multi-payer support
5. AI State of the Art is evolving rapidly, bleeding edge capabilities today will be basic functionality within months. 

## Key Outcomes

- ⚡ **Speed**: Process hundreds of claims in minutes
- 💰 **Cost**: <$0.01 per claim (vs $25-50 manual review)
- 📊 **Consistency**: 92.5% average confidence across all decisions
- 🔍 **Auditability**: 100% of decisions include policy citations with page numbers
- 🤖 **Scalability**: Process 1,000+ claims per day, with opportunities to expand as needed

## The Challenge: A Human Bottleneck
Processing claims has traditionally been a paper-chase, back-and-forth nightmare causing lengthy delays in provider revenue cycles and error prone claim processing for payers:

1. A provider submits a claim for a knee injection procedure
2. A claims analyst identifies relevant policies among hundreds of documents
3. They file through PDFs, searching for procedure codes, medical necessity criteria, age limits, exclusions
4. They verify diagnosis codes match, check if prior authorization was obtained, review clinical notes
5. After all research is complete, they call the payer to review and present a case for payment to be approved

#### It's not sustainable...

- **🐌 Slow**: Complex claims can take 30-60 minutes which can amount to 100s of hours of labor each month
- **💸 Expensive**: At ~$50/hour, those hours put significant downward pressure on provider earnings
- **🚧 Inconsistent**: Policies can be misread or misinterpreted, exclusions and conditions can be overlooked or misunderstood.
- **🙋‍♂️ Not Scalable**: Need to hire proportionally as claim volume grows

### The Opportunity

We loaded 416 [Premera Blue Cross Blue Shield medical policy documents](https://www.premera.com/wa/provider/reference/medical-policies-search/?q=policy&af1eq=&hpp=20&p=PBC-MedicalPolicy&) into a directory. Each PDF contained structured information somewhere in the doc, but it required some careful parsing against a defined schema. We were in search of the following information:

- Policy IDs and names
- Procedure codes (CPT, HCPCS)
- Diagnosis codes (ICD-10)
- Medical necessity criteria
- Age limits, frequency limits
- Exclusions and special requirements
- Authorization requirements

With structured medical policy data in a database we could query, the reality of building an AI Claims Analyst was becoming a reality. 

 And the results blew away our expectations. We expected a 10x improvement on processing speed with variable performance quality. What we got was a 100x speed multiplier with impeccable accuracy. Here's how we did it.

## Step 1: Making PDFs Machine-Readable

### The Challenge with PDFs 
PDFs can be keyword searched, but those searches have very limited functionality. Trying to run any type of query or analysis on PDF information is impossible in its native format. 

### The Solution: Structured Data Extraction
Imagine being able to recall everything you've ever read in complete detail, and be able to reference even the finest details anytime you needed them? That's how powerful these recall task agents are. They are complimentary skills that humans just aren't very good at. 

We called on the [Datalab Extraction API](https://documentation.datalab.to/docs/welcome/api#structured-extraction) to pull structured data out of the policy pdf documents. Here's what happened:

1. **Schema Design**: We created a policy schema defining exactly what information we were looking for from each policy document. 
2. **Automated Extraction**: We sent 416 PDFs to the Datalab Extraction API (391 processed)
3. **Structured Output**: Datalab returned JSON files that we're able to query
4. **Database Loading**: We loaded everything into DuckDB, which is well-suited for fast queries on data that includes lots of text (ie policy information). 

#### Results

- ✅ 416 PDFs processed and loaded into the "policy knowledge base"
- ✅ 391 policies successfully extracted and structured - for demo purposes, we excluded 25 policies that were over 100 pages in length
- ✅ All policy data now searchable in milliseconds using Claude Desktop using a MCP Server 

```
Policy ID: 1.01.18
Policy Name: Pneumatic Compression Pumps for Treatment of Lymphedema and Venous Ulcers
Procedure Codes: E0650, E0655, E0660...
Coverage: Durable Medical Equipment (DME)
Medical Necessity: 
  - Failed to respond to conservative measures
  - Clinical documentation supporting member has lymphedema which has failed to respond to limb elevation or compression 
Source: Document 1.01.18.pdf
```

## Step 2: The Magic of AI - Turning Data into Intelligence with MCP

Even with searchable policies and all of the required information, someone still needs to:
- Understand the claim
- Find relevant policies
- Read and interpret policy language
- Check if the claim meets all criteria
- Make a recommendation
- Document the reasoning

This is where Large Language Models like GPT, Gemini, Llama, or Claude Sonnet are incredibly powerful. Utilizing a LLM to do the heavy lifting allows the human user to focus their time on reviews instead of performing research tasks. 

#### Logical Policy Matching

When a claim comes in, the system automatically finds relevant policies by:
- Matching procedure codes (if the claim has code 20610, find policies mentioning 20610)
- Matching keywords in service descriptions (if the claim mentions "knee injection," find policies about knee procedures)
- Matching service categories (if it's an orthopedic procedure, look in orthopedic policies)

#### AI Reasoning and Analysis

We send the claim information along with the relevant policies to our LLM with very specific instructions:

```
1. You are a healthcare provider claims analyst. 
2. Review this claim against the medical policies from BCBSA.  
3. Provide a recommendation with specific citations.
```

The AI reads through the policy details, compares them to the claim information, and provides a well documented recommendation. It's able to do this because LLMs are trained on immense amounts of data and information, providing them with expertise across a wide variety of domains. When the LLM can use that knowledge base and apply it to a speciality task with local data, like it can in this case, the power of AI starts to produce measurable business results. 

#### Structured Responses

The system returns structured JSON data, which makes it very easy to connect with other software or databases related to the task. Depending on the response, setting up additional workflows based on the status of the claim is straghtforward. Connecting downstream workflows and reporting, managing resources and optimizing people, improving patient outcomes and experiences. 

```json
{
  "recommendation": "approve",
  "confidence_score": 0.95,
  "summary": "Claim meets medical necessity criteria",
  "key_findings": [
    "Patient age 38 meets minimum age requirement of 18",
    "Documented conservative treatment failure for 12 weeks",
    "No exclusionary conditions present"
  ],
  "policy_references": [
    {
      "policy_id": "1.01.18",
      "policy_name": "Viscosupplementation",
      "source_document": "1.01.18.pdf",
      "source_page": 4,
      "source_quote": "Covered when conservative treatment fails after 6 weeks",
      "relevance": "Establishes medical necessity threshold"
    }
  ]
}
```

#### AI Model Evaluations

Not all AI models are the same, they each have a unique style, personality, and core competencies. One model might be a strong analyst but a poor writer. Some cost $3 per request, others are $0.01. Don't use a $3 model when a $0.01 model will do the job well enough. Model evaluations are a critical step in developing and deploying AI Agents. 

We tested 8 different models for the claims processor using [Oxen.ai](https://www.oxen.ai) and the results were enlightening. Performance variance was quite high between the models for this use case, and the more advanced models didn't consistently outperform the more basic models as you might expect. Cost was also a big consideration as we're thinking about the job at scale - with the most expensive models costing 300x more than our base model. 

For our evaluation we processed 100 claims submitted in a csv file. The four models below completed the task sufficiently and we verified claims were processed with 100% accuracy. The other four models did not perform well or had trouble processing the job at all. As you can see with the results, Open AI's GPT-4o-mini model performed very well both in terms of cost and quality of results. 

| Model | Processing Time | Cost |
|-------|----------------|------|
| Open AI GPT-4o-mini | 4m 38s | $0.0089 |
| Open AI GPT 4o | 2m 34s | $0.1409 |
| Gemini 2.5 Pro Preview | 4m 45s | $0.0362 |
| Anthropic Claude Sonnet 4 | 3m 39s | $0.0356 |




## Step 3: Making a Conversational Agent
Making the system entirely automated introduces risk, especially when processing highly complex, unique medical claims. The AI Claims Agent is designed to amplify a claims specialist, not replace them. Making it conversational reduces the need for users to:
- Learn a new UI or process
- Fill out forms 
- Navigate complex claims processes
- Track field names and codes, building their case for the claim

### MCP is the Key to Specialized AI

The Model Context Protocol (MCP) acts as a secure communication layer that allows a LLM like Claude to interact with our specialized claims processing system. We won't cover securing your MCP server and user authentication here, that's an entire article on it's own that we'll cover seperately. Just remember, securing your agent is critical.

**1. Tool Registration**: Our MCP server exposes specific capabilities for Claude to utilize:
- `search_policies`: Find relevant medical policies by procedure codes or keywords
- `process_claim`: Analyze a claim against applicable policies
- `get_policy_details`: Retrieve specific policy information and requirements

**2. Intelligent Routing**: When Claude receives a claims-related request, it:
- Parses the natural language input to extract claim details
- Determines which tools are needed based on the request type
- Calls the appropriate MCP tools with structured parameters

**3. Claims Processing Engine**: Our backend system:
- Queries the DuckDB policy database for matching policies
- Sends claim + policy data to the GPT-4o-mini API for analysis
- Returns structured JSON with recommendations, confidence scores, and citations

**4. Response Assembly**: Claude receives the structured data and:
- Formats it into human-readable language
- Highlights key findings and policy references
- Provides actionable next steps for the user

This architecture allows Claude to leverage domain-specific expertise while maintaining the conversational interface users expect, creating a seamless bridge between AI chat and specialized claims processing logic. 

**Working with your AI Agent is as easy as a conversation with a colleague**

This is where the magic happens for users. We integrated our system with Claude Desktop (ChatGPT is an option) using the Model Context Protocol (MCP). What is MCP? It's a communication protocol similar to an API that allows a LLM like GPT-4o-mini to operate on top of a private database like the one we built with the medical policy data. Providing the MCP server with a few basic commands creates a structure for the user to communicate with the LLM about information in that data. In this case, it allows users to ask natural language questions to Claude about specific medical claims and their coverage policies.

## Working a Claim

Instead of researching policies and filling out forms, users can assign the heavy lifting to Claude by simply asking Claude to work the claim. The input Claude needs is fairly open ended, the LLM can interpret requests similar to how a trained professional would - and in some cases better. I've tested this with dumping a .xls file with 100 claims on it and no other context, I've dumped a single line from a spreadsheet into the chat window, and I've provided very structured data like below. In all three cases, the agent had no trouble processing the claim(s). We can even converse about specific policies before processing. The Claims AI Agent truly is an extension of your team, ready to assist as much or as little as necessary. 

```
User: "Please process this claim:
- Patient: Jane Doe, age 38
- Service: Knee injection for osteoarthritis
- Procedure Code: 20610
- Diagnosis: M25.561
- Amount: $429.33
- Provider: Dr. Smith, Rheumatologist
- Prior auth: No
- Clinical notes: Patient has tried physical therapy for 12 weeks 
  with no improvement. X-rays show moderate joint space narrowing."

Claude: "I'll process this claim against our policies..."

[4 seconds later]

Claude: "✅ CLAIM APPROVED

Recommendation: APPROVE
Confidence: 95%

This claim meets the medical necessity requirements for 
viscosupplementation (Policy 1.01.18). The patient meets all 
key criteria:

✓ Age 38 (minimum 18 required)
✓ Documented osteoarthritis with imaging
✓ Conservative treatment for 12 weeks (6 weeks minimum required)
✓ No exclusionary conditions

Billing amount of $429.33 is within expected range for this procedure.

Policy References:
- Policy 1.01.18: Viscosupplementation for Knee Osteoarthritis
  Source: 1.01.18.pdf, Page 4
  Quote: "Covered when conservative treatment fails after 6 weeks..."
```

**Batch Processing**

The system can also process multiple claims at once. Here's a real example of processing 10 claims from a CSV file:

```
User: "Can you process the first 10 claims in the attached file using our claims agent?"

Claude: "I'll process the first 10 claims from your CSV file using the claims processing agent..."

[Processing 10 claims - 42 seconds total]

Claude: "## Summary of Claims Processing Results

I've successfully processed all 10 claims from your CSV file. Here's a summary:

### **APPROVED CLAIMS (6 out of 10):**

1. **APP-ORTH-020** - $429.33 - Knee injection - **APPROVED** (95% confidence)
   - Medical necessity documented with failed conservative treatment

2. **APP-ORTH-011** - $338.51 - Knee injection - **APPROVED** (95% confidence)  
   - Prior authorization obtained

3. **APP-CARD-001** - $264.51 - Cardiovascular stress test - **APPROVED** (95% confidence)
   - Prior authorization obtained, documented cardiac condition

4. **APP-CARD-020** - $325.53 - ECG with interpretation - **APPROVED** (90% confidence)
   - Standard of care for heart failure monitoring

5. **APP-RHEUM-009** - $376.69 - Joint injection - **APPROVED** (95% confidence)
   - Failed conservative treatment documented

6. **APP-RHEUM-012** - $353.76 - Joint injection - **APPROVED** (95% confidence)
   - Prior authorization obtained

### **REJECTED CLAIMS (4 out of 10):**

1. **APP-ORTH-008** - $547.17 - Knee injection - **REJECTED** (85% confidence)
   - **Reason:** Required referral not obtained

2. **APP-RHEUM-003** - $360.35 - Joint injection - **REJECTED** (85% confidence)
   - **Reason:** Required referral not obtained, no prior authorization

3. **REJ-ELEC-004** - $1,198.45 - Electrical stimulation device - **REJECTED** (85% confidence)
   - **Reason:** Considered investigational, no documentation of failed treatments
```

### Key Insights
- **Total approved:** $2,489.91 | **Total rejected:** $2,105.97
- **Success rate:** 60% approval rate
- **Main rejection reasons:** Missing referrals, insufficient documentation
- **Processing time:** 42 seconds for 10 complex claims"




### Claims Processing Results

- ⚡ **Processing Time**: <3 seconds per claim (vs 15+ minutes manually)
- 🎯 **Accuracy**: Considers all relevant policy sections simultaneously
- 📋 **Documentation**: Linkable citations with page numbers
- 💪 **Consistency**: Same logic applied to every claim every time
- 💰 **Cost**: <$0.01 per claim (GPT-4o-mini)

## Beyond Claims: AI for Data-Intensive Work

### This Isn't Just About Claims

This pattern we recognize with claims exists in many data-intensive workflows where our professional experience over time becomes an asset. With a more robust system for recalling that information and details about those experiences, we can focus on work that we excel at: being creative, intuitive, and reasoning about novel challenges we face. To identify real world examples where agents like the Claims AI can excel, we've identified projects with the following characteristics to be great candidates for evaluation:

1. **Large Document Rulesets**: Policies, contracts, regulations, or manuals provide a ruleset for complex manual tasks. 
2. **Repetitive Evaluation**: Comparing requests/applications against a well defined criteria
3. **Need for Citations**: Regulatory compliance, audit trails, legal protection
4. **Speed Matters**: Backlog reduction, faster turnaround, information reference, competitive advantages


## How We Built This
As with any software development in the age of AI, it's not difficult to write a bunch of code. The challenge lies in designing an application that is reliable, focused, secure, and effective in addressing the job to be done. 

For this project, the most critical piece was preparing the information to train the agent to be an expert on our medical policies. Because of the amorphous nature of PDFs, where they lack consistent structure from one to the next, we had to be thoughtful about the schema of our extracted data. How do we design a knowledge base for policy expertise necessary to process claims accurately? We ran a few iterations of this schema before we ended up with something sufficient. For a production environment, this schema would likely evolve over time and be a major piece of our version improvements. 

When designing and building AI Agents, the most important thing to do is keep them simple. Make them very specialized, dedicated to performing precise tasks over and over again. Don't try to make a single agent do too many different things. This will help keep your Agent code bases organized and make tracking down issues/bugs much easier. It also simplifies security and agent authentication. 

Getting up and running with AI Agents can be done in a matter of weeks. Security requirements and regulated/sensitive data environments are the most impactful variables on these timelines, but building evaluations and prototypes in these cases can be very helpful before making a bigger investment. This was our timeline for the Claims AI project:

**Week 1: Data Extraction**
- Designed policy schema
- Tested extraction on 5-10 sample policies
- Refined schema based on results
- Ran batch extraction on all 421 PDFs
- Validated extracted data
- **Effort**: 1 developer, 1 week
- **Cost**: Datalab API fees (~$64 for >6,000 pages of PDFs)

**Week 2: Claims Processor Development**
- Built policy matching logic
- Integrated GPT-4 API
- Designed prompt engineering for accurate results
- Implemented confidence scoring
- Added citation extraction
- Created batch processing capability
- **Effort**: 1 developer, 1 week
- **Cost**: OpenAI Subscription with API Access ($20/mo)

**Week 3: MCP Server Integration**
- Implemented JSON-RPC protocol
- Created tool definitions
- Integrated with claims processor
- Configured Claude Desktop
- Tested end-to-end flows
- **Effort**: 1 developer, 0.5 weeks
- **Cost**: Development time only

**Week 3.5: Testing & Refinement**
- Created test claim dataset
- Ran accuracy validation
- Fixed edge cases
- Optimized performance
- Created documentation
- **Effort**: 1 developer, 0.5 weeks
- **Cost**: Oxen.ai Evaluation & Testing ($14), API testing ($11)

**Total Implementation:**
- **Timeline**: 4 weeks
- **Team**: 1 developer
- **One-time Costs**: <$100
- **Ongoing Costs**: ~$0.015 per claim

## Common Concerns & FAQs

### "Can We Trust AI With Critical Decisions?"

We completely understand this concern—you're dealing with decisions that directly impact patient care and your organization's financial health. That's why we've designed our system around AI augmentation, not replacement. Think of our Claims AI Agent as your most knowledgeable teammate who never gets tired, always cites their sources, and consistently applies the same high standards to every case.

The system provides recommendations with confidence scores rather than making final decisions for you. High-confidence recommendations (above 90%) can flow through with a complete audit trail, while medium-confidence cases (70-90%) are flagged for your quick review, and anything below 70% confidence goes directly to your experienced analysts. Every single decision includes full reasoning and cites specific policy sections, and you always have the ability to override any recommendation. We've seen remarkable results in testing: 92.5% average confidence across all test claims with 100% citation coverage for audit trails.

### "What About Data Privacy & Security?"

Data security is a top priority for Agentic AI, we come from the privacy and security industry after all. When we build agents, we include multiple layers of security and data protection. All API calls are encrypted using HTTPS, while your policies are stored locally and claims are processed in memory - they're never permanently stored on external servers. Personal health information can be anonymized before processing, and all activities are logged for compliance purposes. The MCP server runs locally under your complete access control.

For healthcare organizations requiring HIPAA compliance, we support OpenAI's HIPAA-compliant API tier with Business Associate Agreements, data encryption at rest, and proper access controls. We're happy to work with your compliance team to ensure all requirements are met and documented properly.

### "What If The AI Makes A Mistake?"

We've built comprehensive safeguards specifically to address this valid concern. Our multilayer protection includes confidence scoring that routes uncertain cases to humans, mandatory citation requirements for every decision, regular spot checking and quality monitoring, complete audit trails for error analysis, and continuous improvement through feedback loops.

Here's what we've learned that might surprise you: AI errors tend to be consistent, meaning if the system makes a mistake, it will make the same mistake every time and these errors become much easier to detect and fix systematically. Human errors, while less frequent in some areas, tend to be more variable and harder to predict. The real power comes from combining human judgment with AI consistency, creating a partnership that outperforms either approach alone.

## Success Metrics & KPIs

### How to Measure Success
With any innovation project, it's important to have KPIs so you can make informed decisions about continuing to invest, expanding the scope, or even shutting things down. While every business is unique, these are some standard metrics to consider when deploying a Claims Agent. 

**Operational Metrics:**
- ⚡ **Processing Time**: Target <10 seconds per claim
- 🎯 **Auto-Approval Rate**: High confidence claims (target >90%)
- 👥 **Human Review Rate**: Medium/low confidence (target <10%)
- ✅ **Override Rate**: How often humans disagree with AI (target <2%)

**Financial Metrics:**
- 💰 **Cost Per Claim**: Track API costs (target <$0.02)
- 📊 **Labor Savings**: Reduction in manual processing hours
- 🚫 **Reduce Errors**: Reduction of unnecessary claim payments
- 🚀 **Throughput**: Claims processed per day vs baseline
- 💵 **ROI**: Total savings vs implementation costs

**Quality Metrics:**
- 🎓 **Accuracy Rate**: Correct recommendations validated by humans
- 📋 **Citation Coverage**: % of decisions with proper references
- 🔍 **Audit Pass Rate**: % passing quality review
- ⏱️ **Time to Resolution**: End-to-end claim processing time

**User Adoption Metrics:**
- 😊 **User Satisfaction**: Survey scores
- 📈 **Usage Rate**: % of claims processed via AI vs manual
- 🎪 **Error Reports**: Issues reported by users
- 💪 **Training Time**: Time to proficiency for new users


## Conclusion

The healthcare claims processing system we built isn't just about faster claims—it's a blueprint for how AI can augment human intelligence in data-intensive work.

**The Core Principles:**
1. ✅ **Structure First**: Get data organized and queryable
2. ✅ **AI Superpowers**: Empower humans, don't replace them
3. ✅ **Always Cite**: Maintain auditability and explainability
4. ✅ **Start Small**: Prove value before scaling
5. ✅ **Measure Everything**: Track metrics religiously

**The Opportunity:**
Every organization has processes like this—repetitive, document-intensive work that requires expertise but follows patterns. These are perfect candidates for a custom AI Agent.

**Start with one process. Prove the value. Scale from there.**

The future of knowledge work isn't humans **or** AI. It's humans **and** AI, each doing what they do best, together achieving what neither could alone.

For more information or to discuss this case study further, we'd love to hear from you. Contact us on our [website](https://getcarmen.ai) or at [hello@getcarmen.ai](mailto:hello@getcaramen.ai)