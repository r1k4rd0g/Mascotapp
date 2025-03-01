import PropTypes from 'prop-types';
import { Modal, Form, Input, Switch, Button } from 'antd';
import { useEffect, useState } from 'react';

export const EditCountryModal = ({
    visible,
    onCancel,
    onSave,
    onSaveMultiple,
    initialData,
    isMultiple,
    totalItems,
    modalData
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
                    form.setFieldsValue(modalData[currentIndex + 1]);
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
    return (
        <Modal
            open={visible}
            title={isMultiple ? `Editar País ${currentIndex + 1} de ${totalItems}` : "Editar País"}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    {isMultiple ? `Guardar y ${currentIndex === totalItems - 1 ? 'Finalizar' : 'Siguiente'}` : 'Guardar'}
                </Button>,
            ]}
            onOk={!isMultiple ? handleSave : null}
        >
            <Form form={form} initialValues={initialData}>
                <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Activo" name="isActive" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    );
};

EditCountryModal.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onSaveMultiple: PropTypes.func,
    initialData: PropTypes.object,
    isMultiple: PropTypes.bool,
    totalItems: PropTypes.number,
    modalData: PropTypes.array.isRequired,
};