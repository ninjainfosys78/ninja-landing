---
title: "Nepal's data centre and cloud directive, 2081: what it asks of software companies"
description: "A plain reading of Nepal's data centre and cloud directive, 2081: who must enrol, what government data needs, and what it does not say about localisation."
date: 2026-10-14
tags: [strategy, infrastructure]
faq:
  - q: "What is Nepal's Data Center and Cloud Service Directive, 2081?"
    a: "It is a directive issued by the Ministry of Communication and Information Technology in early 2025 (2081 BS) under the Electronic Transactions Act, 2063. It requires data centres and cloud service providers to enrol with the Department of Information Technology and meet security, continuity and reporting requirements."
  - q: "Does the directive require all data to be stored in Nepal?"
    a: "Not as a general rule for everyone, as far as the published summaries show. Its strongest requirements are about government data, which must sit in qualified facilities such as the government's Integrated Data Management Center or a data centre rated at least Tier 3. Sector regulators can add their own rules on top."
  - q: "Does a software company that only uses the cloud need to register?"
    a: "The directive is aimed at entities that operate data centres or provide cloud services to others. A company that builds software and rents servers is usually a customer of a provider, not a provider itself. If you resell hosting, storage or compute to others, read the directive closely, because you may be offering a cloud service."
  - q: "What should a software company selling to the government do now?"
    a: "Find out where each system's data will be hosted before you bid, confirm the facility is enrolled and rated as the directive requires, keep a written record of where data lives and who can reach it, and plan for security audits and incident reporting."
---

For most of the last fifteen years, where a Nepali software company kept its data was a question nobody asked. You picked a server you could afford, often in Singapore or Frankfurt, sometimes in a rack in Kathmandu, sometimes on a laptop under a desk. If the system worked, nobody wanted to know more.

That era is ending. In early 2025 the Ministry of Communication and Information Technology issued the **Data Center and Cloud Service (Operation and Management) Directive, 2081**. It is short, it is not widely read, and it changes the questions a buyer can ask you. Government offices, banks and regulated businesses now have a written standard to point at when they ask where their data lives and who looks after it.

We run several products that store sensitive data in Nepal: phone calls, identity documents, signed contracts, camera footage. We have had to read this directive closely. This post is our plain reading of it, written for other software companies that need to understand it without a law degree.

Two cautions before we begin. First, we are a software group, not a law firm. This is how we read the directive and the commentaries on it, not legal advice. Second, the authoritative text is the Nepali original published by the Ministry. Where English summaries disagree, and in a few places they do, the Nepali text wins. If a contract depends on it, read the original, or have someone read it with you.

## What the directive is, in one paragraph

The directive was issued by the Ministry of Communication and Information Technology under the Electronic Transactions Act, 2063. It is dated 2081/10/15 in Bikram Sambat, which is late January 2025, and it was made public shortly after. It applies to two kinds of business: those that operate **data centres** and those that provide **cloud services**. It requires both to enrol with the **Department of Information Technology** before they offer services, to keep certain security and continuity standards, to be audited every year, and to report security incidents. It sets stricter conditions for facilities that hold government data. And it gives the Department the power to cancel an enrolment when a provider does not comply.

That is the whole thing in outline. The details are where it matters for a software company.

## Who it applies to, and who it does not

This is the first question every software founder asks: does this apply to me?

The directive is written for **service providers**: entities that run a data centre, or provide cloud services such as hosting, storage or compute to others. An entity that does both has to enrol separately for each.

A company that **builds software and rents servers** is, in most cases, not a provider under the directive. It is a customer of one. If you build a school management system and host it on a virtual server you rent, the directive regulates your hosting company, not you.

The line gets blurry in three common situations, and these are worth thinking about carefully:

1. **You resell hosting.** Many Nepali agencies host their clients' websites and systems on servers they rent and bill for it monthly. That looks a lot like providing a cloud service.
2. **You run a platform that stores other businesses' data as its main job.** Backups, file storage, document storage, video storage. The more your product resembles infrastructure, the closer you are to the line.
3. **You run your own racks.** If you have servers in your own premises or a colocation facility and offer capacity on them to others, you may be operating something the directive cares about.

If you are in one of these, read the directive in full and ask for advice. If you are not, the directive still matters to you, because it now shapes what your customers will ask about your provider.

## What enrolment asks for

The enrolment list is long, and reading it is the fastest way to understand what the government thinks a responsible provider looks like.

Both data centres and cloud providers are asked for their company registration, a **security and privacy policy**, a **business continuity plan**, details of their technical staff, the location of their infrastructure, and the IP address ranges they use.

**Data centres** are also asked for fire safety assurance, a building completion certificate, the facility's tier details, a description of physical security, a high-level electrical design, and a landowner agreement where the land is leased. Within a year of enrolling, they must submit a certificate of their **tier rating**.

**Cloud providers** are also asked for their agreement with the data centre they run on, and their affiliation with an internet or network service provider.

Both are expected to hold recognised certification for **information security management**, and cloud providers also for **IT service management**. The Department issues an enrolment certificate after it has inspected the infrastructure.

Providers that were already operating when the directive came into force had six months to apply. That window closed in mid-2025, so any provider still serving customers today should be able to show you its enrolment.

## The tier question

The word in the directive that will matter most to software companies selling to government is **tier**.

Tier ratings are a widely used way of classing data centres by how well they keep running when something fails. They run from Tier 1, which has little redundancy, to Tier 4, which is built to keep running through almost any single failure. In practice the tiers are about power, cooling and network paths: whether there is a second one of everything, and whether you can maintain the first without switching off the servers.

The directive requires a data centre that stores **government data** to be rated at least **Tier 3**. A Tier 3 facility is designed so that any component can be taken out for maintenance without shutting down what it serves.

For a software company that means a simple thing. If you are building a system for a government office, a municipality or a public body, **your choice of hosting is no longer just a cost decision.** A cheap server in a facility without the right rating may make your bid non-compliant, however good your software is.

## Government data and the Integrated Data Management Center

The directive also gives a central place to the government's own **Integrated Data Management Center**, which prepares infrastructure and colocation space for government IT services. In broad terms, government systems are expected to run in government data facilities, with room for exceptions and for a qualified committee to approve other arrangements where there are good reasons. Security agencies sit outside this particular rule.

The practical lesson is that a vendor building for government should ask, early and in writing: **where is this system expected to be hosted, and who decides?** Many delivery problems in public IT come from a vendor building for one hosting environment and being told, late, to deploy in another.

## Audits, reporting and the boring parts that matter most

The rules most likely to change daily life for a provider are the least dramatic ones:

- **An annual security audit.** Every year, an outside review of how the infrastructure is secured.
- **Annual compliance details** submitted to the Department.
- **A compliance officer**, or an arrangement with an authorised institution, responsible for meeting the standards.
- **Reporting unauthorised access.** When someone gets in who should not, the provider must report it to the authorities promptly and act on it. Summaries mention reporting to the Department and to the national Cyber Security Center.
- **Keeping CCTV footage of the facility** for three months.

If you build software, none of these is your obligation directly. All of them tell you what to ask your provider, and what a serious buyer may soon ask you.

## What the directive does not say

Most commentary on the directive misses its gaps, and they matter as much as its rules.

**It does not set a general data localisation rule** for every business, as far as we can see from the published text and the summaries of it. It does not say that every company's customer data must be stored in Nepal. Its firmest storage rules are about government data. People who say "the law now says all data must stay in Nepal" are, as far as we can tell, overstating it.

**It does not set sector-specific rules** for banks, insurers, hospitals, payment companies, telecom operators or other regulated businesses. Those come from their own regulators, such as Nepal Rastra Bank for banks and payment providers, and the Nepal Telecommunications Authority for telecom operators. A bank's requirements on where data sits may be stricter than anything in this directive, and they are set elsewhere.

**It does not settle cross-border transfers.** Whether and how data may move abroad, with what safeguards, is not something this directive lays out in detail. Commentators in Nepal have pointed out exactly this gap: the country still needs a clear answer on what data must stay local, what may move with safeguards, and what may move freely.

**It does not set fines** in the summaries we have read. The enforcement tool it describes is cancelling a provider's enrolment.

**It is meant to be reviewed.** The directive itself provides for an evaluation two years after it came into force, which falls in early 2027. Expect changes.

So the honest summary is this. The directive raises the floor for anyone operating infrastructure in Nepal, and sets a clear bar for government data. It does not, by itself, require every software company to move every byte home. The pressure to do that is coming from buyers and regulators, not from this one document.

## Why buyers will start asking anyway

Even where the law does not require something, customers increasingly expect it. We see the shift in our own sales conversations.

A municipality wants to know whether its residents' records are on a server it could inspect. A bank wants to know where call recordings are stored and who at the vendor can play them. A company moving its contracts to digital signing wants to know whether signed documents ever leave the country. A business choosing a camera app wants to know whether its shop footage passes through servers abroad.

None of these buyers cites the directive by section number. But the directive gives them words for a question they were already asking, and a standard they can point at. Once one vendor in a market can answer "here is the enrolled, rated facility in Nepal where your data lives, and here is our audit", the others are asked the same question.

## What a software company should do now

If you build software in Nepal, especially for government or regulated customers, here is what we would do in your place. Most of it is cheap. All of it is easier now than in the middle of a tender.

**1. Write down where your data lives.** For each product, list every place customer data is stored or passes through: the database, backups, file storage, logs, email providers, analytics, error tracking, AI services. You will be surprised how many of them are abroad. Logs and backups are the usual surprise.

**2. Ask your providers for their enrolment.** If you host with a Nepali data centre or cloud provider, ask whether it is enrolled with the Department of Information Technology, what tier rating its facility has, and when its last security audit was. A provider that cannot answer is telling you something.

**3. Separate government work from the rest.** If you sell to government, plan its hosting separately from day one. A system that must sit in a Tier 3 facility or the government's own data centre should be designed so that it can, not ported there in a panic after contract signing.

**4. Read your sector regulator, not just this directive.** If your customers are banks, payment companies, insurers, hospitals or telecom operators, their regulators' rules on data, outsourcing and hosting matter more than this directive. Read them before you design your hosting.

**5. Have an incident plan on paper.** The directive expects providers to report unauthorised access promptly. Your customers will expect the same of you. Decide now who is woken up, who decides whether an event is an incident, and who tells the customer. A plan written in calm is worth ten written in panic.

**6. Keep your design portable.** The directive will be reviewed, sector rules will evolve, and a data protection framework may change the picture again. Build so that you can move a system between providers, or between abroad and Nepal, without rewriting it. Containers, infrastructure as code, and backups you have actually restored are what make that possible.

## How we approach it

For our own products, we made a decision before the directive existed, and the directive has only made it easier to explain. **Where the data is the product, we keep it in Nepal wherever we reasonably can.** Camera footage in LunaCam runs through relays and storage in Nepal. In ePahichan, the signing key never leaves the signer's phone at all, which is a stronger answer than any data centre can give. In each case, the question "where does my data go?" is part of what the customer is buying, and we would rather answer it in the product than in the small print.

We are also honest that "wherever we reasonably can" is a real limit. Some parts of a modern product, such as the best speech and language models, are not yet available inside the country, and a product that uses them has to say so plainly rather than pretend otherwise.

That choice has costs. Infrastructure in Nepal is often more expensive than the equivalent abroad, there are fewer providers to choose from, and some of the tools a team takes for granted elsewhere have to be run by hand. We think it is worth it, because trust is the product, and trust is hard to build on a server nobody in the country can see.

We wrote about how a small group decides what to share across products in [what products in a group should share](/blog/what-products-should-share). Infrastructure is one of the clearest cases. A group that runs its own careful, audited, documented infrastructure once, and shares it, can offer every product a better answer to the question this directive puts in buyers' mouths.

## The short version

- The Data Center and Cloud Service (Operation and Management) Directive, 2081 was issued by the Ministry of Communication and Information Technology in early 2025 under the Electronic Transactions Act, 2063.
- Data centres and cloud providers must enrol with the Department of Information Technology, show security and continuity plans, hold recognised certifications, be audited yearly and report unauthorised access.
- Facilities holding government data must be rated at least Tier 3, and government systems are expected to run in government data facilities unless an exception is approved.
- It does not, by itself, require every company to store all data in Nepal, and it leaves sector rules and cross-border transfers to others.
- It is due for review in early 2027.
- For a software company, the practical steps are to know where your data lives, ask your providers for their enrolment and tier, plan government hosting separately, read your customers' regulators, and keep your systems portable.

Rules like this tend to arrive quietly and matter loudly, usually in the middle of a tender. Reading them early is cheap.
