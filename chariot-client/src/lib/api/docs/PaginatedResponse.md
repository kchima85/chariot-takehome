# PaginatedResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | **Array&lt;string&gt;** | Array of items | [default to undefined]
**limit** | **number** | Number of items to return | [default to undefined]
**offset** | **number** | Number of items to skip | [default to undefined]
**total** | **number** | Total number of items | [default to undefined]
**count** | **number** | Number of items returned | [default to undefined]

## Example

```typescript
import { PaginatedResponse } from './api';

const instance: PaginatedResponse = {
    data,
    limit,
    offset,
    total,
    count,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
