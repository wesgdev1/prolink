import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useServices } from "../../domain/services/useServices";
import {
  ServicesContainer,
  ServicesHeader,
  ServicesTitle,
  SearchSection,
  SearchContainer,
  SearchInput,
  FilterSelect,
  SearchStats,
  AddServiceButton,
  ServicesGrid,
  ServiceCard,
  ServiceCardHeader,
  ServiceTypeChip,
  ServiceName,
  ServiceDescription,
  ServiceCardBody,
  ServiceSpecs,
  ServiceSpec,
  SpecValue,
  SpecLabel,
  ServicePrice,
  PriceValue,
  PriceLabel,
  ServiceCardFooter,
  EditServiceButton,
  StatusBadge,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  EmptyStateSubtext,
  LoadingContainer,
} from "./StyledComponentsServices";

export const Services = () => {
  const { data, loading, error } = useServices();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleAddService = () => {
    navigate("/profile/servicios/add");
  };

  const handleEditService = (serviceId) => {
    navigate(`/profile/servicios/edit/${serviceId}`);
  };

  const formatPrice = (price) => {
    if (!price) return "0";
    return new Intl.NumberFormat("es-CO").format(price);
  };

  const getServiceIcon = (typeService) => {
    switch (typeService) {
      case "Fibra Óptica":
        return "🌐";
      case "Inalámbrico":
        return "📡";
      case "Dedicado":
        return "🔒";
      case "Empresarial":
        return "🏢";
      case "Residencial":
        return "🏠";
      default:
        return "📶";
    }
  };

  // Obtener tipos únicos de servicio para el filtro
  const serviceTypes = useMemo(() => {
    if (!data) return [];
    const types = [...new Set(data.map((service) => service.typeService))];
    return types.filter(Boolean);
  }, [data]);

  // Filtrar servicios basado en búsqueda y filtros
  const filteredServices = useMemo(() => {
    if (!data) return [];

    return data.filter((service) => {
      // Filtro por término de búsqueda
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.typeService.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por tipo de servicio
      const matchesType =
        filterType === "all" || service.typeService === filterType;

      // Filtro por estado
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && service.status) ||
        (filterStatus === "inactive" && !service.status);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [data, searchTerm, filterType, filterStatus]);

  if (loading) {
    return (
      <ServicesContainer>
        <LoadingContainer>
          <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Cargando servicios...</span>
          </Spinner>
        </LoadingContainer>
      </ServicesContainer>
    );
  }

  if (error) {
    return (
      <ServicesContainer>
        <EmptyState>
          <EmptyStateIcon>⚠️</EmptyStateIcon>
          <EmptyStateText>Error al cargar servicios</EmptyStateText>
          <EmptyStateSubtext>
            Ha ocurrido un error al cargar los servicios. Por favor, intenta
            nuevamente.
          </EmptyStateSubtext>
        </EmptyState>
      </ServicesContainer>
    );
  }

  return (
    <ServicesContainer>
      <ServicesHeader>
        <ServicesTitle>Servicios Disponibles</ServicesTitle>
      </ServicesHeader>

      <SearchSection>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar servicios por nombre, descripción o tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Todos los tipos</option>
            {serviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </FilterSelect>
        </SearchContainer>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <SearchStats>
            {filteredServices.length} de {data?.length || 0} servicios
          </SearchStats>
          <AddServiceButton onClick={handleAddService}>
            <i className="bi bi-plus-circle"></i>
            Agregar Servicio
          </AddServiceButton>
        </div>
      </SearchSection>

      {!data || data.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon>📦</EmptyStateIcon>
          <EmptyStateText>No hay servicios creados</EmptyStateText>
          <EmptyStateSubtext>
            Comienza creando tu primer servicio haciendo clic en el botón
            &quot;Agregar Servicio&quot;
          </EmptyStateSubtext>
        </EmptyState>
      ) : filteredServices.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon>🔍</EmptyStateIcon>
          <EmptyStateText>No se encontraron servicios</EmptyStateText>
          <EmptyStateSubtext>
            Intenta ajustar los filtros de búsqueda para encontrar los servicios
            que buscas
          </EmptyStateSubtext>
        </EmptyState>
      ) : (
        <ServicesGrid>
          {filteredServices.map((service) => (
            <ServiceCard key={service.id}>
              <StatusBadge status={service.status}>
                {service.status ? "Activo" : "Inactivo"}
              </StatusBadge>

              <ServiceCardHeader>
                <ServiceTypeChip>
                  <span>{getServiceIcon(service.typeService)}</span>
                  {service.typeService}
                </ServiceTypeChip>
                <ServiceName>{service.name}</ServiceName>
                {service.description && (
                  <ServiceDescription>{service.description}</ServiceDescription>
                )}
              </ServiceCardHeader>

              <ServiceCardBody>
                <ServiceSpecs>
                  <ServiceSpec>
                    <SpecValue>
                      <i className="bi bi-download"></i>
                      {service.bandwidthDownload || "N/A"}
                      {service.bandwidthDownload && " MB"}
                    </SpecValue>
                    <SpecLabel>Descarga</SpecLabel>
                  </ServiceSpec>
                  <ServiceSpec>
                    <SpecValue>
                      <i className="bi bi-upload"></i>
                      {service.bandwidthUpload || "N/A"}
                      {service.bandwidthUpload && " MB"}
                    </SpecValue>
                    <SpecLabel>Subida</SpecLabel>
                  </ServiceSpec>
                </ServiceSpecs>

                <ServicePrice>
                  <PriceValue>{formatPrice(service.price)}</PriceValue>
                  <PriceLabel>COP / mes</PriceLabel>
                </ServicePrice>
              </ServiceCardBody>

              <ServiceCardFooter>
                <EditServiceButton
                  onClick={() => handleEditService(service.id)}
                >
                  <i className="bi bi-pencil"></i>
                  Editar Servicio
                </EditServiceButton>
              </ServiceCardFooter>
            </ServiceCard>
          ))}
        </ServicesGrid>
      )}
    </ServicesContainer>
  );
};
