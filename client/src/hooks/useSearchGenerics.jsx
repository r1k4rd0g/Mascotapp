import PropTypes from "prop-types";
import Highlighter from "react-highlight-words";
import { Input, Space, Button, theme } from "antd";
import { Icons } from "../components/utils/icons";
import { TooltipGenerics } from "../components/utils/tooltipGenerics";
import { extendedThemeConfig } from "../styles/theme";


export const useSearchGenerics = (
    dataIndex,
    searchText,
    setSearchedColumn,
    setSearchTextHandlers,
    searchInput,
    currentSearchedColumn,
    parentData,
    entityConfig,
) => {
    const { token } = theme.useToken();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchTextHandlers.setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const getColumnSearchProps = () => ({
        filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters, close }) => (
            <div style={{
                padding: 16,
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
                                setSearchTextHandlers.setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                            icon={<Icons name="FilterOutlined" />}
                            style={{ width: 50 }}
                        />
                    </TooltipGenerics>
                    <TooltipGenerics title="Limpiar y cerrar" placement='top'>
                        <Button
                            type="default"
                            onClick={() => {
                                clearFilters();
                                setSearchTextHandlers.setSearchText(() => {
                                    const newSearchText = "";
                                    setSearchedColumn("");
                                    setSelectedKeys([]);
                                    confirm();
                                    close();
                                    return newSearchText;
                                });
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
        filterIcon: () => (
            <Icons name="SearchOutlined" style={{ color: "#F5EFE7" }} />
        ),
        onFilter: (value, record) => {
            if (dataIndex === entityConfig?.parentField && entityConfig?.parentField && parentData) {
                const parent = parentData.find(p => p.id === record[dataIndex]);
                return parent?.name?.toLowerCase().includes(value.toLowerCase());
            }
            // Para cualquier otra columna (como 'name'), aplicamos el filtro estándar
            return record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase());
        },
        filterDropdownProps: {
            onOpenChange: (open) => {
                if (open && searchInput.current) {
                    setTimeout(() => {
                        searchInput.current?.select();
                    }, 100);
                }
            },
        },
        render: (text) =>
            currentSearchedColumn === dataIndex ? (
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
    searchText: PropTypes.string,
    setSearchedColumn: PropTypes.func.isRequired,
    setSearchTextHandlers: PropTypes.shape({ // Actualizamos los PropTypes
        setSearchText: PropTypes.func.isRequired,
    }).isRequired,
    searchInput: PropTypes.object,
    currentSearchedColumn: PropTypes.string,
    parentData: PropTypes.array,
    entityConfig: PropTypes.object
};
