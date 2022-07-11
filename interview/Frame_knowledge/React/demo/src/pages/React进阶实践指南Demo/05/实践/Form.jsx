import React from 'react';

export default class Form extends React.Component {
    state = {
        formData: {}
    };

    submitForm = cb => {
        console.log('submitForm', this.state.formData);
        cb && cb({...this.state.formData});
    }

    resetForm = () => {
        const {formData} = this.state;
        Object.keys(formData).forEach(key => {
            formData[key] = '';
        });
        this.setState({
            formData
        }, () => {
            console.log('resetForm', this.state.formData);
        });
    }

    handleChange = (name, value) => {
        console.log('handleChange:', name, value)
        this.setState((state) => {
            return {
                formData: {
                    ...state.formData,
                    [name]: value
                }
            }
        })
    }

    render() {
        const {children} = this.props;
        const renderChildren = [];
        // 获取子组件 重新组装
        React.Children.forEach(children, child => {
            console.log(child);
            if (child.type.displayName === 'formItem') {
                const {name} = child.props;
                renderChildren.push(React.cloneElement(child, {
                    key: name,
                    value: this.state.formData[name],
                    handleChange: this.handleChange
                }, child.props.children));
            }
        })
        return renderChildren;
    }
}

Form.displayName = 'form';
