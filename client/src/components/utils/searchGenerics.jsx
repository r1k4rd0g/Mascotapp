import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Highlighter from "react-highlight-words";
import { Input, Space, Button, theme } from "antd";
import { Icons } from "./icons";
import { TooltipGenerics } from "./tooltipGenerics";
import { extendedThemeConfig } from "../../styles/theme";


export const useSearchGenerics = (dataIndex) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const { token } = theme.useToken();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    }
    const getColumnSearchProps = () => ({
        filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters, close }) => (
            <div style={{
                padding :16,
                backgroundColor: extendedThemeConfig.bodySortBg,
                borderRadius: extendedThemeConfig.borderRadius,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                border: `1px solid ${token.colorBorderSecondary}`,
            }}>
                <Input
                    ref={searchInput}
                    placeholder={`Buscar por ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <TooltipGenerics title="Buscar" placement='top'>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<Icons name="SearchOutlined" />}
                            style={{ width: 50 }}
                        />
                    </TooltipGenerics>
                    <TooltipGenerics title="Filtrar" placement='top'>
                        <Button
                            type="default"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                            icon={<Icons name="FilterOutlined" />}
                            style={{ width: 50 }}
                        />
                    </TooltipGenerics>
                    <TooltipGenerics title="Limpiar y cerrar" placement='top'>
                        <Button
                            type="default"
                            onClick={() => {clearFilters && handleReset(clearFilters);
                                close()
                            }}
                            icon={<Icons name="RedoOutlined" />}
                            size="small"
                            style={{ width: 50 }}
                        />
                    </TooltipGenerics>
                    <TooltipGenerics title="Cerrar" placement='top'>
                        <Button
                            type="default"
                            size="small"
                            icon={<Icons name="CloseOutlined" />}
                            onClick={() => close()}
                            style={{ width: 50 }}
                        />
                    </TooltipGenerics>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <Icons name="SearchOutlined" style={{ color: filtered ? "#1677ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange: (open) => {
                if (open) {
                    setTimeout(() => {
                        searchInput.current?.select();
                    }, 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightClassName="YourHighlightClass"
                    searchWords={[searchText]}
                    autoEscape={true}
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    return getColumnSearchProps();
};

useSearchGenerics.propTypes = {
    dataIndex: PropTypes.string.isRequired,
};