import { PromoCode } from "../domain/promo_code";
import { IUser } from "./iuser";

export interface IPromoService{
    fetchAndValidate(user: IUser, code: string): Promise<PromoCode>;
}