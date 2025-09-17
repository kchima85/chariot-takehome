# PaymentsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**paymentsControllerGetPayments**](#paymentscontrollergetpayments) | **GET** /payments | Get all payments with optional filtering|

# **paymentsControllerGetPayments**
> Array<PaymentResponseDto> paymentsControllerGetPayments()


### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let recipient: string; //Filter by recipient name (optional) (default to undefined)
let scheduledDateFrom: string; //Filter by scheduled date from (ISO date string) (optional) (default to undefined)
let scheduledDateTo: string; //Filter by scheduled date to (ISO date string) (optional) (default to undefined)

const { status, data } = await apiInstance.paymentsControllerGetPayments(
    recipient,
    scheduledDateFrom,
    scheduledDateTo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recipient** | [**string**] | Filter by recipient name | (optional) defaults to undefined|
| **scheduledDateFrom** | [**string**] | Filter by scheduled date from (ISO date string) | (optional) defaults to undefined|
| **scheduledDateTo** | [**string**] | Filter by scheduled date to (ISO date string) | (optional) defaults to undefined|


### Return type

**Array<PaymentResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of payments |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

