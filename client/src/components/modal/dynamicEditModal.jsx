import { Modal, Form, Input, Switch, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const DynamicEditModal = ({
    visible,
    onCancel,
    onSave,
    entityConfig,
    //initialData,
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
            const updatedItem = {
                ...modalData[currentIndex],
                ...values,
                [entityConfig.parentField]: values[entityConfig.parentField]
            };

            await onSave(updatedItem);

            if (modalData.length > 1 && currentIndex < modalData.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                onCancel();
                setCurrentIndex(0);
            }
        } catch (error) {
            console.error("Error de validación:", error);
        }
    };

    return (
        <Modal
            open={visible}
            title={`Editar ${entityConfig.label} ${modalData.length > 1 ?
                `(${currentIndex + 1}/${modalData.length})` : ''}`}
            onCancel={onCancel}
            onOk={handleSave}
            footer={[
                <Button key="cancel" onClick={onCancel}>Cancelar</Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    {modalData.length > 1 && currentIndex < modalData.length - 1 ?
                        'Guardar y Siguiente' : 'Guardar'}
                </Button>
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Este campo es requerido' }]}
                >
                    <Input />
                </Form.Item>

                {entityConfig.showParent && (
                    <Form.Item
                        label={entityConfig.parentLabel}
                        name={entityConfig.parentField}
                        rules={[{ required: true, message: 'Selección requerida' }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {parentData?.map(parent => (
                                <Select.Option key={parent.id} value={parent.id}>
                                    {parent.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                <Form.Item
                    label="Activo"
                    name="isActive"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
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
    parentData: PropTypes.array
};