import React, {useCallback, useState} from 'react';
import {Button, DatePicker, Input, Modal, Select, Tooltip} from "antd";
import moment from "moment";
import {InfoCircleFilled} from "@ant-design/icons";
import {Formik, Form} from 'formik';

const disabledDate = (current: moment.Moment) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
};

function QuantityInput({onChange, value}: { value?: number, onChange: (value: number) => void }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value: inputValue} = e.target;
        const reg = /^\d+$/;
        if (reg.test(inputValue) || inputValue === '') {
            onChange(+inputValue);
        }
    };

    return (
        <Input value={value || ''} placeholder="Quantity" min={1} max={100}
               onChange={handleChange}
               suffix={<Tooltip title="Shipping Dates May Vary Based on Quantity"><InfoCircleFilled
                   style={{color: '#ccc'}}/></Tooltip>}/>
    )
}

const holidays = ["07-04", "12-25"];

const isHoliday = (value: moment.Moment) => holidays.includes(value.format("MM-DD"));

export default function CalculatorForm() {
    const [result, setResult] = useState<string | undefined>();

    function addBusinessDays(originalDate: moment.Moment, numDaysToAdd: number) {
        const Sunday = 0;
        const Saturday = 6;
        let daysRemaining = numDaysToAdd;

        const newDate = originalDate.clone();

        while (daysRemaining > 0) {
            newDate.add(1, 'days');
            if (newDate.day() !== Sunday && newDate.day() !== Saturday && !isHoliday(newDate)) {
                daysRemaining--;
            }
        }

        return newDate;
    }

    const handleSubmit = useCallback(({datepicker, productstyle, productnumber}) => {
        if (!datepicker || !productstyle || !productnumber) {
            Modal.warning({
                title: 'Warning',
                content: 'Plesae Fill All Information Correctly',
                width: '50%'
            });
        }

        if(productnumber > 100){
            Modal.warning({
                title: 'Warning',
                content: "Quantity Can't Be More Than 100",
                width: '50%'
            });
        }

        let shippingTime = 0;

        if (productstyle === 'cotton') {
            shippingTime += productnumber < 50 ? 2 : 3
        } else {
            shippingTime += productnumber < 50 ? 4 : 5
        }

        const date = addBusinessDays(datepicker, shippingTime);

        setResult(date.format('YYYY-MM-DD'));
    }, []);

    return (
        <Formik initialValues={{datepicker: undefined, productnumber: undefined, productstyle: undefined}}
                onSubmit={handleSubmit}>
            {({values, setFieldValue}) => (
                <Form>
                    <div className="fields">
                        <DatePicker
                            format="YYYY-MM-DD"
                            disabledDate={disabledDate}
                            value={values.datepicker}
                            onChange={value => setFieldValue('datepicker', value)}
                        />
                        <Select value={values.productstyle} placeholder="Fabric Type"
                                onChange={value => setFieldValue('productstyle', value)}>
                            <Select.Option value="cotton">Cotton</Select.Option>
                            <Select.Option value="linen">Linen</Select.Option>
                        </Select>
                        <QuantityInput value={values.productnumber}
                                       onChange={value => setFieldValue('productnumber', value)}/>
                    </div>
                    <Button htmlType="submit">Calculate</Button>
                    {result ?
                        <p className="info-message">Your Estimated Shipping Date is {result}</p> :
                        <p className="info-message">Please enter your order information to estimate shipping date</p>
                    }
                </Form>
            )}
        </Formik>
    );
}
