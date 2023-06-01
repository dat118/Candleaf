import { DeliveryOptions, RecurringDelivery } from "@/app/models";
import { AppSelect } from "@/components/common";
import styled from "@emotion/styled";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const WEEKS = [
  { value: RecurringDelivery.OneWeek, label: "1 week" },
  { value: RecurringDelivery.TwoWeeks, label: "2 weeks" },
  { value: RecurringDelivery.ThreeWeeks, label: "3 weeks" },
  { value: RecurringDelivery.FourWeeks, label: "4 weeks" },
];

type ChooseDeliveryTypeProps = {
  onChangeDeliveryType: (
    deliveryType: DeliveryOptions,
    subscribeTime: number
  ) => void;
};

const ChooseDeliveryType = ({
  onChangeDeliveryType,
}: ChooseDeliveryTypeProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subscribeTime, setSubscribeTime] = useState(0);
  const [deliveryType, setDeliveryType] = useState(DeliveryOptions.Subscribe);

  const handleChangeSubscribeTime = (index: number) => {
    setSubscribeTime(index);
    setAnchorEl(null);
    onChangeDeliveryType(deliveryType, index);
  };

  const onChangeSubscribe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryType(event.target.value as unknown as DeliveryOptions);
    onChangeDeliveryType(
      event.target.value as unknown as DeliveryOptions,
      subscribeTime
    );
  };

  return (
    <StyledDeliveryType>
      <RadioGroup
        defaultValue={DeliveryOptions.Subscribe}
        name="deliveryType"
        onChange={onChangeSubscribe}
      >
        <FormControlLabel
          value={DeliveryOptions.OneTime}
          control={<Radio sx={{ marginLeft: "10px" }} />}
          label={
            <Typography
              variant="body1"
              sx={{ lineHeight: "16px", fontSize: { xs: 12, sm: 12, md: 15 } }}
            >
              One time purchase
            </Typography>
          }
        />
        <Stack className="subscribe-container" spacing={1}>
          <FormControlLabel
            value={DeliveryOptions.Subscribe}
            control={<Radio />}
            label={
              <Stack direction="row" spacing={1} display="flex">
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: "16px",
                    fontSize: { xs: 12, sm: 12, md: 15 },
                  }}
                >
                  Subscribe and delivery every
                </Typography>
                <AppSelect
                  small={true}
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  defaultValue={subscribeTime}
                  options={WEEKS}
                  onClose={() => setAnchorEl(null)}
                  onClickOpenMenu={(event) => setAnchorEl(event.currentTarget)}
                  onChangeMenu={handleChangeSubscribeTime}
                />
              </Stack>
            }
          />
          <Typography variant="caption">
            Subscribe now and get the 10% of discount on every recurring
            order.The discount will be applied at checkout.
            <Link href="/" className="see-detail">
              See details
            </Link>
          </Typography>
        </Stack>
      </RadioGroup>
    </StyledDeliveryType>
  );
};
export default ChooseDeliveryType;

const StyledDeliveryType = styled(FormControl)(({ theme }: any) => {
  return {
    ".subscribe-container": {
      padding: "18px 5px 18px 10px",
      border: "1px solid #E6E6E6",
      borderRadius: 7,
      width: 370,
    },
    ".see-detail": {
      color: theme.palette.primary.main,
      margin: "0 3px",
    },
  };
});
