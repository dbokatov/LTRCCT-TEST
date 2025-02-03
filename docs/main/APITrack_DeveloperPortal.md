---
#icon: material/folder-open-outline
icon: material/medal
---



# Using Webex Contact Center Developer Portal

## Story

Webex Contact Center APIs enable automation, customization, and integration with external applications. By leveraging these APIs, administrators can streamline processes, enhance agent efficiency, and improve customer interactions. In this lab, we will explore how to interact with the Developer Portal and execute API calls to manage Address Books.


## Mission Details
In this mission, attendees will learn how to interact with Webex Contact Center APIs by performing API calls via the  [**Developer Portal**](https://developer.webex-cx.com/){:target="_blank"}. Specifically, we will work with the Address Book feature.

**<details><summary>Good to Know <span style="color: orange;">[Optional]</span></summary>**

### Understanding API Calls with Real-Life Comparisons

APIs (Application Programming Interfaces) allow different systems to communicate by sending and receiving structured requests. Here are the most common API call types, explained with real-world analogies:

1. **GET – Retrieving Information**</br>
Analogy: Checking your bank balance at an ATM. You request information, and the system provides it without making any changes.
Example Use Case: Retrieving a customer’s interaction history in Webex Contact Center before routing their call.

2. **POST – Creating New Data**</br>
Analogy: Ordering a new item online. You submit details, and a new order (or record) is created in the system.
Example Use Case: Creating a new customer support ticket when an issue is reported during a call.

3. **PUT – Updating Existing Data**</br>
Analogy: Changing your home address in an online banking system. Instead of adding a new address, the existing one is replaced.
Example Use Case: Updating a customer’s preferred contact method in a CRM system.

4. **PATCH – Modifying Partial Data**</br>
Analogy: Updating your phone number on a social media profile without changing other details like your name or email.
Example Use Case: Changing only the priority level of an existing support ticket.

5. **DELETE – Removing Data**</br>
Analogy: Canceling a hotel reservation. The record is removed, preventing further use.
Example Use Case: Deleting a scheduled callback request if the customer no longer needs assistance.

6. **Webhooks – Automated Notifications**</br>
Analogy: Receiving an SMS alert when your package is out for delivery. Instead of requesting updates repeatedly, you get notified when something happens.
Example Use Case: Notifying an agent when a VIP customer joins the queue.

APIs streamline operations by automating tasks, integrating systems, and enhancing customer experiences. Understanding these core calls helps optimize workflows in platforms like Webex Contact Center.
</details>

**Address Book Overview**
Address Book is available in the Webex Contact Center Agent Desktop. Agents can make outbound calls using Address Books, selecting numbers from pre-configured lists instead of entering them manually in the 'Start a New Call' field. Administrators can configure and manage Address Books via the Webex Contact Center APIs.


## Build

### Access the Developer Portal

1. Open [**Developer Portal**](https://developer.webex-cx.com/){:target="_blank"} and click on **Sign In**. 
   Your login will be of the format **<span class="attendee-id-container">wxcclabs+admin_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+admin_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy" title="Click to copy!"></span></span>**. You will see another login screen with OKTA on it where you may need to enter the email address again and the password provided to you.

2. Click on **Documentation** which is on top right corner of the protal page.

    ![profiles](../graphics/Lab2/DevPortalLogin.gif)

3. On Menu pannel on the left, scroll down to **API Reference** section and click on **Adress Book**. Observe available 


### Create a New Address Book (POST)

### Update Address Book Description (PUT)

### Create a New Address Book Entry (POST)

### Retrieve Address Book Entry by ID (GET)

### Use Search API to retrieve data from Analyzer DB.

## Summary
This mission shows how to quickly change the behavior of your contact center logic in extreme situation without even login-in in to Control Hub.