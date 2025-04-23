import { useNavigate } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { Icons } from "./utils/icons";
import { TooltipGenerics } from "./utils/tooltipGenerics";
import { extendedThemeConfig } from "../styles/theme";
import "./locationSelector.css";

export const LocationSelector = () => {
    const navigate = useNavigate();

    const locations = [
        {
            title: "Paises",
            iconName: "EarthPlanet",
            link: "/ubicaciones/paises",
        },
        {
            title: "Departamentos",
            iconName: "State",
            link: "/ubicaciones/departamentos",
        },
        {
            title: "Ciudades",
            iconName: "City",
            link: "/ubicaciones/ciudades",
        },
        {
            title: "Barrios",
            iconName: "Neigh",
            link: "/ubicaciones/barrios",
        },
    ];

    const handleLocationClick = (path) => {
        navigate(path);
    }

    return (
        <div style={{
            height: "85vh",
            textAlign: "center",
            padding: "4px",
            margin: "0px 0px",
            backgroundColor: extendedThemeConfig.backgroundColor,
            borderRadius: "8px",
        }}>
            <h2>Elige con qué elemento trabajar</h2>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                margin: '0 auto',
            }}>
                <Row gutter={[16, 16]} style={{ display: 'flex', justifyContent: "center" }}>
                    {locations.map((location) => (
                        <Col key={location.title} xs={24} sm={12} md={12} lg={12} xl={12} >
                            <TooltipGenerics title={`Ir a ${location.title}`} placement="top">
                                <Card
                                    className="location-card"
                                    onClick={() => handleLocationClick(location.link)}
                                    hoverable
                                >
                                    <div className="location-icon">
                                        <Icons name={location.iconName} size={48} />
                                    </div>
                                    <div className="location-label">
                                        {location.label}
                                    </div>
                                </Card>
                            </TooltipGenerics>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}
