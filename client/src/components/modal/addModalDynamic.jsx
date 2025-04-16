import { Modal, Form, Input, Switch, Select, Button, InputNumber, Spin } from 'antd';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLoadingState } from '../../hooks/useLoadingState';


export const AddModalDynamic = ({
    visible,
    onCancel,
    onSaveCompleted,
    entityConfig,
    parentData,
    addItem,
}) => {
    const [form] = Form.useForm();
    const { loadingStates, startLoading, stopLoading } = useLoadingState();



    useEffect(() => {
        form.resetFields();
    }, [form, visible]);

    const handleSaveForm = async () => {
        try {
            startLoading("addItem");
            const values = await form.validateFields();
            await addItem(values);
            stopLoading("addItem");
            onSaveCompleted(`Se ha creado: ${values.name}`, "success");
        } catch (error) {
            stopLoading("addItem");
            if (error.response && error.response.data && error.response.data.message) {
                // Error proveniente del backend
                onCancel(error.response.data.message, "error");
            } else if (error.errorFields) {
                // Errores de validación del formulario (frontend)
                const errorMessages = error.errorFields.map(field => field.errors.join(', ')).join('; ');
                onCancel(`Error de validación: ${errorMessages}`, "error");
            } else {
                // Otro tipo de error (ej., error de red sin respuesta del backend)
                onCancel("Error al crear el registro, sin respuesta del servidor", "error");
            }
        }
    };
    const renderFormItems = () => {
        const formItems = [];
        formItems.push(
            <Form.Item
                label="Nombre"
                name="name"
                rules={[
                    { required: true, message: 'Este campo es requerido' },
                    { max: 50, message: 'El nombre no puede tener más de 50 caracteres' },
                    { pattern: /^[a-zA-Z\s\-']+$/, message: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes' }
                ]}
                key="name">
                <Input />
            </Form.Item>
        );
        formItems.push(
            <Form.Item
                label="Activo"
                name="isActive"
                valuePropName="checked"
                key="isActive">
                <Switch defaultChecked />
            </Form.Item>
        );
        if (entityConfig.showParent) {
            formItems.push(
                <Form.Item label={entityConfig.parentLabel} name={entityConfig.parentField} rules={[{ required: true, message: 'Selección requerida' }]} key={entityConfig.parentField}>
                    <Select showSearch optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                        {parentData?.map(parent => (
                            <Select.Option key={parent.id} value={parent.id}>{parent.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            );
        }
        if (entityConfig.customFields) {
            Object.keys(entityConfig.customFields).forEach(fieldName => {
                const fieldConfig = entityConfig.customFields[fieldName];
                let inputComponent;
                switch (fieldConfig.type) {
                    case 'number':
                        inputComponent = <InputNumber />;
                        break;
                    case 'select':
                        inputComponent = (
                            <Select showSearch optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                                {fieldConfig.options?.map(option => (
                                    <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                                ))}
                            </Select>
                        );
                        break;
                    case 'switch':
                        inputComponent = <Switch />;
                        break;
                    default:
                        inputComponent = <Input />;
                }
                formItems.push(
                    <Form.Item label={fieldConfig.label} name={fieldName} rules={fieldConfig.rules} valuePropName={fieldConfig.type === 'switch' ? 'checked' : undefined} key={fieldName}>
                        {inputComponent}
                    </Form.Item>
                );
            });
        }
        return formItems;
    };
    return (
        <Modal
            open={visible}
            title={`Agregar ${entityConfig.label} `}
            onCancel={() => onCancel("Cancelado", "info")}
            footer={[
                <Button key="cancel" onClick={() => onCancel("Cancelado", "info")}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSaveForm} loading={loadingStates.addItem} disabled={loadingStates.addItem}>
                    {loadingStates.addItem ? <Spin size="small" /> : 'Guardar'}
                </Button>
            ]}
            onOk={handleSaveForm}
        >
            <Form form={form} layout="vertical" initialValues={{ [entityConfig.parentField]: parentData?.[0]?.id }}>
                {renderFormItems()}
            </Form>
        </Modal>
    );
};

AddModalDynamic.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSaveCompleted: PropTypes.func.isRequired,
    entityConfig: PropTypes.object.isRequired,
    parentData: PropTypes.array,
    addItem: PropTypes.func.isRequired,
    messageCounter: PropTypes.number
}