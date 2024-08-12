# BE Day 17 - Security - 01: Security concepts

> Learning goals
> Security concepts
>
> - Security is everywhere and about everything
> - Concept: XSS (JS) injection
> - Concept: MFA/2FA
> - Concept: OWASP top 10
> - Concept: What is Phishing?
> - Concept: HTTPS hides sensitive information in transit
> - Concept: VPN
> - Concept: Black hat vs White hat hackers

**Yesterday**

- Pagination
- Sorting and filtering
- Full stack experiment

**TODAY**

- Security concepts

## Security concepts

- Security is a **MASSIVE** and **extremely complex** topic
- It's the most complex topic in the field of IT
- During this submodule we will only _barely_ scratch the surface

- We will focus on cyber security concepts

  - A larger concept is called information security (infosec)
  - Infosec includes cyber and physical security
  - Physical security: physical access to server machines, documents, PCs etc.

- Social engineering is a topic that's considered part of cyber security...
  - ...but not always

### Concepts

- Let's quickly go over some basic terms/concepts

- Social engineering

  - Attackers manipulate and deceive others into actions
  - Leaking confidential information, doing something
  - Psychological manipulation rather than technical exploits
  - Tailgating, Impersonating

- OWASP top 10

  - https://owasp.org/Top10
  - Open Worldwide Application Security Project
  - Software security improvement foundation
  - Estimate of the most critical security risks to web applications

- XSS Injection

  - Cross-site scripting
  - For example, getting JavaScript to run when someone views a forum comment
  - For insecure websites, could steal their login or pretend to be them
  - Mini example
    - In your README.md in GitHub you write some JS
    - Anyone viewing the repo will run the JS
    - The JS redirects the user to another website
      - An _exact_ replica of `github.com` but `github.x0zf1.com`
      - x0zf1.com shows "For additional security, please log in again"
        - User enters GH username and password on fake site
        - Fake site steals the info and redirects user back
        - User never notices their credentials got stolen
  - This is why
    - 1. We cannot allow anyone to inject their own JS on our page
    - 2. Use multi-factor authentication _everywhere_



- Multi-factor authentication

  - Normal username/password can be broken or stolen a bit too easy
  - Two or more factors required to authenticate
  - Factors
    - Something you know: password, PIN, answers to secret questions
    - Something you have: physical device like a smart card, or phone (SMS)
    - Something you are: biometrics like fingerprint, iris or face scan
  - Even if your password leaks, attackers need something else too to log in
  - Sometimes we don't even know our password has leaked
  - It's a good idea to sometimes change your important passwords
  - And _do not_ reuse passwords
    - Damage control
    - Someone steals your GitHub password
    - They try to log in your email/amazon/adobe etc with the same password
    - Will they get in?

- What is Phishing?

  - Social engineering attack
  - Attackers impersonate legitimate organizations or individuals
  - Attackers try to trick people into revealing sensitive information
  - Email, text messages, automated voice calls...
  - Can be a blanket attack or targeted (spear phishing)

- VPN

  - Virtual Private Network
  - Used to create a secure connection from one network to another
  - E.g. insecure coffee shop Wifi to company internal network
  - Can provide a high level of security for internet traffic
  - All data between your pc and the internet is routed through the VPN server
  - To Web servers it looks like your requests come from your company IP
    - Because they do!

- HTTPS

  - Encrypted HTTP
  - Regular request-response is sent in plain text
  - The internet is a network of computers

    - All requests and response are passed between machines
    - ANY machine in the middle can see and understand the traffic
    - Usernames, Passwords, Credit card details...

  - With HTTPS the client and server make a secure connection
    - All request & response data is encrypted
    - Machines in the middle cannot read it

- Ransomware

  - Application that encrypts a device, stops the owner from using it
  - Demands a payment
  - If payment is made, will decrypt device and give back control

- Black hat vs white hat hackers

  - Black hat hackers use their skills for malicious purposes

    - Find and abuse security vulnerabilities for personal gain
    - Stealing, selling personal info
    - Disrupting systems and people for profit/fun/revenge

  - White hat hackers

    - AKA ethical hackers
    - Use their skills to help improve security
      - Finding vulnerabilities and weaknesses
      - Then informing about the issue so it can be fixed
    - Might use the same methods as black hats


## How to learn more

- Security is everything and everywhere, so learn _all the things_
- Listen to security podcasts, like Darknet Diaries
- Watch security conference talks

## Exercises

- [21_be-security-mappy-boi](https://classroom.github.com/a/vYurFdkn)

## Self-study prompts

- A nice capture the flag platform https://picoctf.org/about.html
- Security focused podcast https://darknetdiaries.com/
- Classic physical security lecture https://www.youtube.com/watch?v=4-qnYaw7VGo

## Upcoming

- Validation, sanitation
  - Make data consistent and secure
  - Don't trust the frontend to validate inputs!
  - Validation and sanitation to prevent injection and broken data
