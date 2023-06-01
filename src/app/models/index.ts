import { SvgIconProps } from "@mui/material";

export interface IIconProps extends SvgIconProps {
  sx?: object;
  className?: string;
}

export type AccountState = {
  email: string;
  token: string;
  avatar: string;
};

export type Account = {
  email: string;
  password: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  isPopular: boolean;
  apiID: string;
};

export enum DeliveryOptions {
  OneTime,
  Subscribe,
}

export enum RecurringDelivery {
  OneWeek,
  TwoWeeks,
  ThreeWeeks,
  FourWeeks,
}
export enum CheckoutState {
  Cart,
  Detail,
  Shipping,
  Payment,
}

export enum ShippingMethod {
  Standard,
  Express,
}

export enum BillingAddress {
  SameAddress,
  DifferentAddress,
}

export type CartState = {
  items: Array<{
    product: {
      id: string;
      title: string;
      price: number;
      image: string;
      apiID: string;
    };
    quantity: number;
    type: { deliveryOption: DeliveryOptions; subscribeTime: RecurringDelivery };
  }>;
  totalPrice: number;
};

export type FormState = {
  phoneEmail: string;
  name: string;
  secondName: string;
  addressNumber: string;
  city: string;
  postalCode: string;
  note?: string;
  discount?: boolean;
  country?: number;
  province?: number;
  saveInfo?: boolean;
  shippingMethod?: ShippingMethod;
  cardNumber?: string;
  holderName?: string;
  expireDate?: `${string}/${string}`;
  cvv?: string;
  VATNumber?: string;
  PEC?: string;
  billingAddress?: BillingAddress;
};
