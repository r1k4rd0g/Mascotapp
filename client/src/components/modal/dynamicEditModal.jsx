import { Modal, Form, Input, Switch, Select, Button, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const DynamicEditModal = ({
    visible,
    onCancel,
    onSave,
    onSaveMultiple,
    entityConfig,
    initialData,
    isMultiple,
    totalItems,
    modalData,
    parentData
}) => {
    const [form] = Form.useForm();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        form.resetFields();
        if (modalData?.length > 0) {
            form.setFieldsValue(modalData[currentIndex]);
        }
    }, [currentIndex, modalData, form]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const updatedItem = { ...modalData[currentIndex], ...values };
            if (modalData.length > 1) {
                await onSaveMultiple(updatedItem);
                if (currentIndex < modalData.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                } else {
                    setCurrentIndex(0);
                    onCancel();
                }
            } else {
                await onSave(updatedItem);
                onCancel();
            }
        } catch (error) {
            console.error("Error al validar:", error);
        }
    };
    const renderFormItems = () => {
        const formItems = [];
        formItems.push(
            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Este campo es requerido' }]} key="name">
                <Input />
            </Form.Item>
        );
        formItems.push(
            <Form.Item label="Activo" name="isActive" valuePropName="checked" key="isActive">
                <Switch />
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
            title={`Editar ${entityConfig.label} ${isMultiple && totalItems ? `(${currentIndex + 1} de ${totalItems})` : ''}`}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    {isMultiple ? `Guardar y ${currentIndex === totalItems - 1 ?
                    'Finalizar' : 'Siguiente'}` : 'Guardar'}
                </Button>
            ]}
            onOk={!isMultiple ? handleSave : null}
        >
            <Form form={form} layout="vertical" initialValues={initialData}>
                {renderFormItems()}
            </Form>
        </Modal>
    );
};

DynamicEditModal.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    entityConfig: PropTypes.object.isRequired,
    initialData: PropTypes.object,
    modalData: PropTypes.array.isRequired,
    parentData: PropTypes.array,
    isMultiple: PropTypes.bool,
    totalItems: PropTypes.number,
    onSaveMultiple: PropTypes.func
}