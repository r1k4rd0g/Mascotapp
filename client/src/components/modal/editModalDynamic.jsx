import { Modal, Form, Input, Switch, Select, Button, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {useLoadingState} from '../../hooks/useLoadingState';


export const EditModalDynamic = ({
    visible,
    onCancel,
    onSaveCompleted,
    entityConfig,
    initialData,
    isMultiple,
    totalItems,
    modalData,
    parentData,
    editItem,
}) => {
    const [form] = Form.useForm();
    const [currentIndex, setCurrentIndex] = useState(0);
    const { loadingStates, startLoading, stopLoading } = useLoadingState();


    useEffect(() => {
        form.resetFields();
        if (modalData?.length > 0) {
            form.setFieldsValue(modalData[currentIndex]);
        }
    }, [currentIndex, modalData, form]);

    const handleSaveForm = async () => {
        try {
            startLoading(editItem);
            const values = await form.validateFields();
            const updatedItem = { ...modalData[currentIndex], ...values };
            await editItem(updatedItem.id, updatedItem);
            if (modalData.length > 1) {
                if (currentIndex < modalData.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                } else {
                    setCurrentIndex(0);
                    onSaveCompleted(`Se han editado y actualizado los items seleccionados`, "success");
                }
            } else {
                onSaveCompleted(`Se ha editado y actualizado: ${updatedItem.name}`, "success");
            }
            stopLoading(editItem);
        } catch (error) { // Cambiar error a errorInfo
            stopLoading(editItem);
            if (error.response && error.response.data && error.response.data.message) {
                // Error proveniente del backend
                onCancel(error.response.data.message, "error");
            } else if (error.errorFields) {
                const errorMessages = error.errorFields.map(field => field.errors.join(', ')).join('; ');
                onCancel(`Error de validación: ${errorMessages}`, "error");
            } else {
                // Otro tipo de error
                onCancel("Error al editar el registro, sin respuesta del servidor", "error");
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
                <Button key="cancel" onClick={() => onCancel("Cancelado", "info")}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSaveForm} loading={loadingStates.editItem} disabled={loadingStates.editItem}>
                    {isMultiple ? `Guardar y ${currentIndex === totalItems - 1 ?
                        'Finalizar' : 'Siguiente'}` : 'Guardar'}
                </Button>
            ]}
            onOk={!isMultiple ? handleSaveForm : null}
        >
            <Form form={form} layout="vertical" initialValues={initialData}>
                {renderFormItems()}
            </Form>
        </Modal>
    );
};

EditModalDynamic.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSaveCompleted: PropTypes.func.isRequired,
    entityConfig: PropTypes.object.isRequired,
    initialData: PropTypes.object,
    modalData: PropTypes.array.isRequired,
    parentData: PropTypes.array,
    isMultiple: PropTypes.bool,
    totalItems: PropTypes.number,
    editItem: PropTypes.func.isRequired,
    messageCounter: PropTypes.number
}