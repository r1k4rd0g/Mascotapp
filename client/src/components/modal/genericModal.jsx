import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Modal, Form, Input, Switch, Select } from 'antd';

export const GenericModal = ({
    visible,
    onCancel,
    onSave,
    initialData,
    fieldsConfig, // Configuración de campos
    title,
}) => {
    const [form] = Form.useForm();

    // Inicializa el formulario con los datos existentes (si es edición)
    useEffect(() => {
        form.setFieldsValue(initialData || {});
    }, [initialData, form]);

    return (
        <Modal
            open={visible}
            title={title}
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onSave(values);
                        form.resetFields();
                    })
                    .catch(console.error);
            }}
        >
            <Form form={form} layout="vertical">
                {fieldsConfig.map((field) => (
                    <Form.Item
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        rules={field.rules}
                    >
                        {renderFieldComponent(field)}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    );
};

// Función para renderizar el componente adecuado según el tipo de campo
const renderFieldComponent = (field) => {
    switch (field.type) {
        case 'input':
            return <Input />;
        case 'switch':
            return <Switch />;
        case 'select':
            return (
                <Select
                    options={field.options}
                    loading={field.loading}
                    showSearch
                    optionFilterProp="label"
                />
            );
        default:
            return <Input />;
    }
};

GenericModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    initialData: PropTypes.object,
    fieldsConfig: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            rules: PropTypes.array,
            options: PropTypes.array,
            loading: PropTypes.bool,
        })
    ).isRequired,
    title: PropTypes.string.isRequired,
};