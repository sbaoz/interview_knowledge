import React from 'react';
import Form from './Form';
import FormItem from './FormItem';
import Input from './Input';

export default class Index extends React.Component {
    formRef = React.createRef(null);

    submit = () => {
        this.formRef.submitForm((formData) => {
            console.log(formData);
        });
    }

    reset = () => {
        this.formRef.resetForm();
    }

    render() {
        return (
            <div>
                <Form ref={(ref) => this.formRef = ref}>
                    <FormItem name='name' label='我是'>
                        <Input />
                    </FormItem>
                    <FormItem name='mes' label='我想对大家说'>
                        <Input />
                    </FormItem>
                    <input type="text" />
                    <Input />
                </Form>
                <div>
                    <button onClick={this.submit}>submit</button>
                    <button onClick={this.reset}>reset</button>
                </div>
            </div>
        )
    }
}
