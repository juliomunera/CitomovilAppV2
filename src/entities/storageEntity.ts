
export class StorageEntity{
    id : string;
    PhoneNumber : string;
    CodeNumber : string;
    ApplicationID : string;
    DeviceID : string;
    ProjectID : string;
    DoormanPhoneNumber: string;
    Token: string;
    ClientId : string;
}

export interface Deserializable {
    deserialize(input: any): this;
  }

export default StorageEntity;
