# PaymentsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**paymentsControllerGetPayments**](#paymentscontrollergetpayments) | **GET** /payments | Get all payments with optional filtering and pagination|
|[**paymentsControllerGetUniqueRecipients**](#paymentscontrollergetuniquerecipients) | **GET** /payments/recipients | Get unique payment recipients|

# **paymentsControllerGetPayments**
> PaginatedResponse paymentsControllerGetPayments()


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
let limit: number; //Number of items to return (optional) (default to 10)
let offset: number; //Number of items to skip (optional) (default to 0)

const { status, data } = await apiInstance.paymentsControllerGetPayments(
    recipient,
    scheduledDateFrom,
    scheduledDateTo,
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recipient** | [**string**] | Filter by recipient name | (optional) defaults to undefined|
| **scheduledDateFrom** | [**string**] | Filter by scheduled date from (ISO date string) | (optional) defaults to undefined|
| **scheduledDateTo** | [**string**] | Filter by scheduled date to (ISO date string) | (optional) defaults to undefined|
| **limit** | [**number**] | Number of items to return | (optional) defaults to 10|
| **offset** | [**number**] | Number of items to skip | (optional) defaults to 0|


### Return type

**PaginatedResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Paginated list of payments |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsControllerGetUniqueRecipients**
> Array<string> paymentsControllerGetUniqueRecipients()


### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

const { status, data } = await apiInstance.paymentsControllerGetUniqueRecipients();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of unique recipients |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

