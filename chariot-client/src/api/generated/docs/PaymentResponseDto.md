# PaymentResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique payment identifier | [default to undefined]
**amount** | **number** | Payment amount in cents | [default to undefined]
**currency** | **string** | Payment currency code | [default to undefined]
**scheduledDate** | **string** | Scheduled payment date | [default to undefined]
**recipient** | **string** | Payment recipient name | [default to undefined]
**status** | **string** | Payment status | [default to undefined]
**createdAt** | **string** | Payment creation timestamp | [default to undefined]
**updatedAt** | **string** | Payment last update timestamp | [default to undefined]

## Example

```typescript
import { PaymentResponseDto } from './api';

const instance: PaymentResponseDto = {
    id,
    amount,
    currency,
    scheduledDate,
    recipient,
    status,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
