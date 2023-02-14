import { Entity, Property } from "@mikro-orm/core";
import { BaseModel } from "./models/base.model";

@Entity()
export class UserEntity extends BaseModel {
    @Property()
    firstName: string

    @Property()
    lastName: string

    @Property({unique: true})
    email: string

    @Property()
    houseNo: string

    @Property()
    tel: string

    @Property()
    type: string

    @Property({hidden: true})
    password: string;
}