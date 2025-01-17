---
#icon: material/folder-open-outline
icon: material/medal
---



# Mission 1: Callback on Global Error


> !!! Note
      This task relies on completing Mission 3 of Fundamental Labs. Ensure that mission is completed to have a fully functional callback feature in your flow.

## Story 
Imagine a caller is navigating an IVR menu when, suddenly, the call drops due to an unexpected error in the flow. This unplanned interruption leaves the customer disconnected without completing their request. In this scenario we are going to configure our flow to schedule a callback to the caller when such failure scenario occurs.

## Objective

  - You will simulate a global error scenario to trigger a Global Error Event and initiate a workflow to reconnect with a caller whose call was disconnected due to an undefined error.
  - You cannot rely on the Callback node in Main Flow because the call leg is no longer active after termination. Instead, you must design a custom solution to address this limitation.
  - We are going to imitate a real API server by providing realistic responses to requests. For that we chose Server [**MockAPI**](https://mockapi.io/){:target="_blank"}. 

> **<details><summary>Good to Know <span style="color: orange;">[Optional]</span></summary>**
> 
> For more information of how you can use MockAPI please watch these Vidcasts: 
[**[ADVANCED] Use MockAPI to enhance your Demos - PART 1**](https://app.vidcast.io/share/ce058b71-109e-4929-b9ca-46b83d94f7e3){:target="_blank"} and [**[ADVANCED] Use MockAPI to enhance your Demos - PART 2**](https://app.vidcast.io/share/1e259a34-7e9e-44d9-aa5a-5d76e07256a3){:target="_blank"}
> 
> </details>

### Pre-configured entities:        
     
> Outdial Channel/Entry Point: **<span class="attendee-id-container">Outdial_<span class="attendee-id-placeholder" data-prefix="Outdial_" data-suffix="_Channel">Your_Attendee_ID</span>_Channel<span class="copy" title="Click to copy!"></span></span>**
>
> Outdial Queue: **<span class="attendee-id-container">Outdial_<span class="attendee-id-placeholder" data-prefix="Outdial_" data-suffix="_Queue">Your_Attendee_ID</span>_Queue<span class="copy" title="Click to copy!"></span></span>**. 
>
> Your **<span class="attendee-id-container"><span class="attendee-id-placeholder" data-suffix="_Team">Your_Attendee_ID</span>_Team<span class="copy" title="Click to copy!"></span></span>** has been assigned to Outdial Queue **<span class="attendee-id-container">Outdial_<span class="attendee-id-placeholder" data-prefix="Outdial_" data-suffix="_Queue">Your_Attendee_ID</span>_Queue<span class="copy" title="Click to copy!"></span></span>**. 
>

## Build

**We are going to extend the same flow by adding additional functionality so the caller would be offered with a callback later.**

1. Open your flow **Main_Flow_<span class="attendee-id-placeholder">Your_Attendee_ID</span>** and change Edit mode to **On**.
2. Add following 4 flow variables to your flow: 

    - Outtial Entry Point Variable :
    
      >
      > Name: **outdialcbid**<span class="copy-static" data-copy-text="outdialcbid"><span class="copy" title="Click to copy!"></span></span>
      >
      > Type: **String**
      >
      > Default Value: **empty**
    
    - Custom ANI variable:
      
      >
      > Name: **customANI**<span class="copy-static" data-copy-text="customANI"><span class="copy" title="Click to copy!"></span></span>
      >
      > Type: **String**
      >
      > Default Value: **empty**

    - HTTP GET Result variable:
      
      >
      > Name: **getresult**<span class="copy-static" data-copy-text="getresult"><span class="copy" title="Click to copy!"></span></span>
      >
      > Type: **String**
      >
      > Default Value: **empty**

    - Simulated Error variable:
      
      >
      > Name: **simulatederror**<span class="copy-static" data-copy-text="simulatederror"><span class="copy" title="Click to copy!"></span></span>
      >
      > Type: **String**
      >
      > Default Value: **empty**


3. Click on **WantCallback** node  
  
    > Add Option 3. Name it as **Simulate an error**
    >
    > Text-to-Speech Message: ***All agents are busy. Please press 1 if you want to schedule a callback. Press 2 if you want to wait in queue. Press 3 to simulate global error.***<span class="copy-static" data-copy-text="All agents are busy. Please press 1 if you want to schedule a callback. Press 2 if you want to wait in queue. Press 3 to simulate global error."><span class="copy" title="Click to copy!"></span></span>. We are extending the existing message by adding Option 3.

4. Add an **HTTP Request** node for our query. We are going to fetch Outbound Entry Point ID and custom ANI. Remember we used the same custome TAC number in Mission 3 of Fundamental labs.
    
    >
    > Connect WantCallbeck Option 3 to this HTTP node
    >
    > We will connct HTTP node in next step
    >
    > Activity Name: **GET_CBID**<span class="copy-static" data-copy-text="GET_CBID"><span class="copy" title="Click to copy!"></span></span>
    >
    > Use Authenticated Endpoint: **Off**
    >
    > Requestt URL: ***https://674481b1b4e2e04abea27c6e.mockapi.io/flowdesigner/Lab/DynVars?dn={{NewPhoneContact.DNIS | slice(2) }}***<span class="copy-static" data-copy-text="https://674481b1b4e2e04abea27c6e.mockapi.io/flowdesigner/Lab/DynVars?dn={{NewPhoneContact.DNIS | slice(2) }}"><span class="copy" title="Click to copy!"></span></span>
    > 
    > Method: **GET**
    > 
    > Content Type: **Application/JSON**
    >
    > **Parsing Settings:**
    >
    > Content Type: **JSON** 
    >
    > Output Variable: **outdialcbid**<span class="copy-static" data-copy-text="outdialcbid"><span class="copy" title="Click to copy!"></span></span>
    >
    > Path Expression: **$[0].outboundcallbackep**<span class="copy-static" data-copy-text="$[0].outboundcallbackep"><span class="copy" title="Click to copy!"></span></span>
    >
    > Output Variable: **customANI**<span class="copy-static" data-copy-text="customANI"><span class="copy" title="Click to copy!"></span></span>
    >
    > Path Expression: **$[0].tacnumber**<span class="copy-static" data-copy-text="$[0].tacnumber"><span class="copy" title="Click to copy!"></span></span>

    > **<details><summary>**Test your API Source**<span style="color: orange;">[Optional]</span></summary>**
    > 
    > 1. Test your API resource. **https://674481b1b4e2e04abea27c6e.mockapi.io/flowdesigner/Lab/DynVars?dn=*{DNIS}***<span class="copy-static" data-copy-text="https://674481b1b4e2e04abea27c6e.mockapi.io/flowdesigner/Lab/DynVars?dn=*{DNIS}"><span class="copy" title="Click to copy!"></span></span>
    > 
    > 2. Replace DNIS with the provided DNIS number stripping +1
    >
    > <span style="color: orange;">[Example:]</span> If your number **+14694096861**, then your GET Query should be ***https://674481b1b4e2e04abea27c6e.mockapi.io/flowdesigner/Lab/DynVars?dn=4694096861***
    >
    > 3. Open Chrome browser and past your URL. You should get the follwoing result
    > 
    > ![Profiles](../graphics/Lab2/BM2-8-Chrometest.gif)
    > 
    > 4. Test JSON Path in the following tool [https://jsonpath.com/](https://jsonpath.com/){:target="_blank"}
    > 
    > 5. Paste your GET URL into the Browser address line and copy the output in square brackets (including brackets)
    >
    > 6. Open [https://jsonpath.com/](https://jsonpath.com/){:target="_blank"} and paste the copied response into **Inputs** window
    >
    > 7. In **JSONPath** box copy and paste one of the path expression from **FetchFlowSettings** to verify your results.
    >
    > ![Profiles](../graphics/Lab2/BM2-10-JSONPath.gif)
    > </details>


5. Add **Set Veriable** node
    
    >
    > Activity Label: **SetGetResult**
    >
    > Connect **GET_CBID** to this node
    >
    > We will connct **Set Variable** node in next step
    >
    > Variable: **getresult**<span class="copy-static" data-copy-text="getresult"><span class="copy" title="Click to copy!"></span></span>
    >
    > Set To Variable: **GET_CBID.httpResponseBody**<span class="copy-static" data-copy-text="GET_CBID.httpResponseBody"><span class="copy" title="Click to copy!"></span></span>
    >

6. Add one more **Set Veriable** and **Disconnect Contact** nodes
    
    >
    > Activity Label: **SimulateGlobalError**
    >
    > Connect **SetGetResult** to this node
    >
    > Connect this node to **Disconnect Contact**
    >
    > Variable: **simulatederror**<span class="copy-static" data-copy-text="simulatederror"><span class="copy" title="Click to copy!"></span></span>
    >
    > Set Value: ***{{ ANI | 123}}***<span class="copy-static" data-copy-text="{{ ANI | 123}}"><span class="copy" title="Click to copy!"></span></span>
    >

7. Navigate to **Event Flows** and delete connection from **OnGlobalError** to **EndFlow**.
8. Add **HTTP Request** node to the flow

    > Activity Label: **CallBackAPI_Request**
    >
    > Connect the **OnGlobalError** output edge node to this node
    > 
    > Use Authentication Endpoint: **On**
    >
    > Connector: **WxCC_API**
    >
    > Request Path: **/v1/tasks**<span class="copy-static" data-copy-text="/v1/tasks"><span class="copy" title="Click to copy!"></span></span>
    >
    > Method: **POST**
    >
    > Content Type: **Application/JSON**
    >
    > Request Body:
    ``` JSON
    {
        "entryPointId": "{{outdialcbid}}",
        "destination": "{{customANI}}",
        "attributes": {"Message":"tester","To Queue":"sales"},
        "outboundType": "CALLBACK",
        "mediaType": "telephony",
        "callback": {
        "callbackOrigin": "web",
        "callbackType": "immediate"
        }
    }
    ```

8. Add **Condition Node**. In this node we are going to check the status of our API POST request. If it is **201 Created** the output will be **True** and if other than **201** then **False**.
    
    > 
    > Activity Label: **HTTPStatusCode**
    >
    > Connect the output node edge from the **CallBackAPI_Request** node to this node
    >
    > Connect both to **EndFlow** node. We will be able to see in Debug tool whether request was succsesful or not. 
    >
    > In the Expression section write an expresion ***{{CallBackAPI_Request.httpStatusCode == 201}}***<span class="copy-static" data-copy-text="{{HTTP_PUT.httpStatusCode == 201}}"><span class="copy" title="Click to copy!"></span></span>
    

## Testing
   

**Congratulations on completing another mission.**
