---
#icon: material/folder-open-outline
icon: material/medal
---



# Using Webex Contact Center Developer Portal <span style="color: red;">[Building new mission]</span></summary>

## Story

Webex Contact Center APIs enable automation, customization, and integration with external applications. By leveraging these APIs, administrators can streamline processes, enhance agent efficiency, and improve customer interactions. In this lab, we will explore how to interact with the Developer Portal and execute API calls to manage Address Books.


## Mission Details
In this mission, attendees will learn how to interact with Webex Contact Center APIs by performing API calls via the  [**Developer Portal**](https://developer.webex-cx.com/){:target="_blank"}. Specifically, we will work with the Address Book feature.

**<details><summary>Good to Know <span style="color: orange;">[Optional]</span></summary>**

**Understanding API Calls with Real-Life Comparisons**

APIs (Application Programming Interfaces) allow different systems to communicate by sending and receiving structured requests. Here are the most common API call types, explained with real-world analogies:

1. **GET – Retrieving Information**</br>
**Analogy**: Checking your bank balance at an ATM. You request information, and the system provides it without making any changes.</br>
**Example Use Case**: Retrieving a customer’s interaction history in Webex Contact Center before routing their call.</br>

2. **POST – Creating New Data**</br>
**Analogy**: Ordering a new item online. You submit details, and a new order (or record) is created in the system.</br>
**Example Use Case**: Creating a new customer support ticket when an issue is reported during a call.</br>

3. **PUT – Updating Existing Data**</br>
**Analogy**: Changing your home address in an online banking system. Instead of adding a new address, the existing one is replaced.</br>
**Example Use Case**: Updating a customer’s preferred contact method in a CRM system.</br>

4. **PATCH – Modifying Partial Data**</br>
**Analogy**: Updating your phone number on a social media profile without changing other details like your name or email.</br>
**Example Use Case**: Changing only the priority level of an existing support ticket.</br>

5. **DELETE – Removing Data**</br>
**Analogy**: Canceling a hotel reservation. The record is removed, preventing further use.</br>
**Example Use Case**: Deleting a scheduled callback request if the customer no longer needs assistance.</br>

6. **Webhooks – Automated Notifications**</br>
**Analogy**: Receiving an SMS alert when your package is out for delivery. Instead of requesting updates repeatedly, you get notified when something happens.</br>
**Example Use Case**: Notifying an agent when a VIP customer joins the queue.</br>

7. **SEARCH API (GraphQL Queries) – Retrieving Specific Data Efficiently**</br>
**Analogy**: Using a restaurant menu app to filter only "vegan dishes under $10" instead of browsing the entire menu. Unlike traditional GET requests that return all data, GraphQL allows users to request exactly what they need.</br>
**Example Use Case**: Searching for all unresolved support tickets assigned to a specific agent without loading unnecessary ticket details.</br>

APIs streamline operations by automating tasks, integrating systems, and enhancing customer experiences. Understanding these core calls helps optimize workflows in platforms like Webex Contact Center.
</details>



## Build

### Access the Developer Portal

1. Open [**Developer Portal**](https://developer.webex-cx.com/){:target="_blank"} and click on **Sign In**. 
   Your login will be of the format **<span class="attendee-id-container">wxcclabs+admin_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+admin_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy" title="Click to copy!"></span></span>**. You will see another login screen with OKTA on it where you may need to enter the email address again and the password provided to you.

2. Click on **Documentation** which is on top right corner of the portal page.

    ![profiles](../graphics/Lab2/DevPortalLogin.gif)

3. On Menu pannel on the left, scroll down to **API Reference** section and click on **Adress Book**. Observe available API calls

    !!!Note
        **Address Book Overview**</br>
        Address Book is available in the Webex Contact Center Agent Desktop. Agents can make outbound calls using Address Books, selecting numbers from pre-configured lists instead of entering them manually in the 'Start a New Call' field. Administrators can configure and manage Address Books via the Webex Contact Center APIs.

4. Scroll down and click on **Create a new Address Book**, then click on **Try Out**.

    ![profiles](../graphics/Lab2/DevPortal_TryOut.gif)

5. Clear **Request Body** content and paste the following body

    > 
    > Request Body:
    ``` JSON
    {
        "name": "AddressBook_<Your_Attendee_ID>",
        "parentType": "ORGANIZATION"
    }
    ```

    ```Expected Response

    201 Response

    {
      "organizationId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
      "id": "4aa50a6b-a520-4221-bc9d-a050c111061f",
      "version": 0,
      "name": "AddressBook_140",
      "parentType": "ORGANIZATION",
      "createdTime": 1738585491913,
      "lastUpdatedTime": 1738585491913
    }

    ```

  ![profiles](../graphics/Lab1/DevPortal_AddressBookCreate.gif)

6. Login into [Webex Control Hub](https://admin.webex.com){:target="_blank"} by using your Admin profile. 
   Your login will be of the format **<span class="attendee-id-container">wxcclabs+admin_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+admin_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy" title="Click to copy!"></span></span>**. You will see another login screen with OKTA on it where you may need to enter the email address again and the password provided to you.

    ![profiles](../graphics/Lab1/1-CH_Login.gif)

7. Navigate to Address Book and locate your new created **<span class="attendee-id-container">Address_Book_<span class="attendee-id-placeholder" data-prefix="Address_Book_">Your_Attendee_ID</span><span class="copy" title="Click to copy!"></span></span>**


8. Navigate back to **Developer Portal** and select **Address Book** again from left menu pane.

**To be Continued...**

### Update Address Book Description (PUT)

### Create a New Address Book Entry (POST)

### Retrieve Address Book Entry by ID (GET)

### Use Search API to retrieve data from Analyzer DB.

## Summary
This mission shows how to quickly change the behavior of your contact center logic in extreme situation without even login-in in to Control Hub.