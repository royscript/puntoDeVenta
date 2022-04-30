-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema puntodeventa
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema puntodeventa
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `puntodeventa` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema puntodeventa
-- -----------------------------------------------------
USE `puntodeventa` ;

-- -----------------------------------------------------
-- Table `puntodeventa`.`estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`estado` (
  `idEstado` INT NOT NULL AUTO_INCREMENT,
  `nombreEstado` VARCHAR(45) NULL,
  PRIMARY KEY (`idEstado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`familia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`familia` (
  `idFamilia` INT NOT NULL AUTO_INCREMENT,
  `nombreFamilia` VARCHAR(45) NULL,
  PRIMARY KEY (`idFamilia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`estadodinero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`estadodinero` (
  `idEstadoDinero` INT NOT NULL AUTO_INCREMENT,
  `nombreEstadoDinero` VARCHAR(45) NULL,
  PRIMARY KEY (`idEstadoDinero`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`mediopago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`mediopago` (
  `idmediopago` INT NOT NULL AUTO_INCREMENT,
  `nombreMedioPago` VARCHAR(45) NULL,
  `seNecesitaIdDocumentoMedioPago` VARCHAR(45) NULL,
  PRIMARY KEY (`idmediopago`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`proveedor` (
  `idProveedor` INT NOT NULL AUTO_INCREMENT,
  `razonSocialProveedor` VARCHAR(45) NULL,
  `contactoProveedor` VARCHAR(45) NULL,
  `direccionProveedor` VARCHAR(45) NULL,
  `telefonoProveedor` VARCHAR(45) NULL,
  `rutProveedor` VARCHAR(45) NULL,
  PRIMARY KEY (`idProveedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`tipoventa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`tipoventa` (
  `idTipoVenta` INT NOT NULL AUTO_INCREMENT,
  `nombreTipoVenta` VARCHAR(45) NULL,
  `estadodinero_idEstadoDinero` INT NOT NULL,
  PRIMARY KEY (`idTipoVenta`, `estadodinero_idEstadoDinero`),
  INDEX `fk_tipoventa_estadodinero_idx` (`estadodinero_idEstadoDinero` ASC) VISIBLE,
  CONSTRAINT `fk_tipoventa_estadodinero`
    FOREIGN KEY (`estadodinero_idEstadoDinero`)
    REFERENCES `puntodeventa`.`estadodinero` (`idEstadoDinero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`permiso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`permiso` (
  `idPermiso` INT NOT NULL AUTO_INCREMENT,
  `nombrePermiso` VARCHAR(45) NULL,
  PRIMARY KEY (`idPermiso`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(45) NULL,
  `apellidoUsuario` VARCHAR(45) NULL,
  `emailUsuario` VARCHAR(45) NULL,
  `rutUsuario` VARCHAR(45) NULL,
  `contrasenaUsuario` VARCHAR(45) NULL,
  `direccionUsuario` VARCHAR(45) NULL,
  `telefonoUsuario` VARCHAR(45) NULL,
  `permiso_idPermiso` INT NOT NULL,
  PRIMARY KEY (`idUsuario`, `permiso_idPermiso`),
  INDEX `fk_usuario_permiso1_idx` (`permiso_idPermiso` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_permiso1`
    FOREIGN KEY (`permiso_idPermiso`)
    REFERENCES `puntodeventa`.`permiso` (`idPermiso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`usuariosonline`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`usuariosonline` (
  `idusuariosonline` INT NOT NULL AUTO_INCREMENT,
  `fechausuariosOnline` DATETIME NULL,
  `tokenusuariosOnline` VARCHAR(300) NULL,
  `usuariosonlinecol` VARCHAR(45) NULL,
  `usuario_idUsuario` INT NOT NULL,
  `usuario_permiso_idPermiso` INT NOT NULL,
  PRIMARY KEY (`idusuariosonline`, `usuario_idUsuario`, `usuario_permiso_idPermiso`),
  INDEX `fk_usuariosonline_usuario1_idx` (`usuario_idUsuario` ASC, `usuario_permiso_idPermiso` ASC) VISIBLE,
  CONSTRAINT `fk_usuariosonline_usuario1`
    FOREIGN KEY (`usuario_idUsuario` , `usuario_permiso_idPermiso`)
    REFERENCES `puntodeventa`.`usuario` (`idUsuario` , `permiso_idPermiso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`documentodeventa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`documentodeventa` (
  `idDocumentoDeVenta` INT NOT NULL AUTO_INCREMENT,
  `nombreDocumentoDeVenta` VARCHAR(45) NULL,
  PRIMARY KEY (`idDocumentoDeVenta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`venta` (
  `idVenta` INT NOT NULL AUTO_INCREMENT,
  `fechaVenta` DATETIME NULL,
  `totalVenta` INT ZEROFILL NULL,
  `tipoventa_idTipoVenta` INT NOT NULL,
  `documentodeventa_idDocumentoDeVenta` INT NOT NULL,
  `Cajero_idUsuario1` INT NOT NULL,
  `Cliente_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idVenta`, `tipoventa_idTipoVenta`, `documentodeventa_idDocumentoDeVenta`, `Cajero_idUsuario1`, `Cliente_idUsuario`),
  INDEX `fk_venta_tipoventa1_idx` (`tipoventa_idTipoVenta` ASC) VISIBLE,
  INDEX `fk_venta_documentodeventa1_idx` (`documentodeventa_idDocumentoDeVenta` ASC) VISIBLE,
  INDEX `fk_venta_usuario1_idx` (`Cajero_idUsuario1` ASC) VISIBLE,
  INDEX `fk_venta_usuario2_idx` (`Cliente_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_venta_tipoventa1`
    FOREIGN KEY (`tipoventa_idTipoVenta`)
    REFERENCES `puntodeventa`.`tipoventa` (`idTipoVenta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_venta_documentodeventa1`
    FOREIGN KEY (`documentodeventa_idDocumentoDeVenta`)
    REFERENCES `puntodeventa`.`documentodeventa` (`idDocumentoDeVenta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_venta_usuario1`
    FOREIGN KEY (`Cajero_idUsuario1`)
    REFERENCES `puntodeventa`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_venta_usuario2`
    FOREIGN KEY (`Cliente_idUsuario`)
    REFERENCES `puntodeventa`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`venta_mediopago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`venta_mediopago` (
  `mediopago_idmediopago` INT NOT NULL,
  `venta_idVenta` INT NOT NULL,
  `venta_tipoventa_idTipoVenta` INT NOT NULL,
  `venta_documentodeventa_idDocumentoDeVenta` INT NOT NULL,
  `venta_Cajero_idUsuario1` INT NOT NULL,
  `venta_Cliente_idUsuario` INT NOT NULL,
  `dinero_venta_mediopago` INT NULL,
  `idDocumento_venta_mediopago` VARCHAR(300) NULL,
  PRIMARY KEY (`mediopago_idmediopago`, `venta_idVenta`, `venta_tipoventa_idTipoVenta`, `venta_documentodeventa_idDocumentoDeVenta`, `venta_Cajero_idUsuario1`, `venta_Cliente_idUsuario`),
  INDEX `fk_mediopago_has_venta_venta1_idx` (`venta_idVenta` ASC, `venta_tipoventa_idTipoVenta` ASC, `venta_documentodeventa_idDocumentoDeVenta` ASC, `venta_Cajero_idUsuario1` ASC, `venta_Cliente_idUsuario` ASC) VISIBLE,
  INDEX `fk_mediopago_has_venta_mediopago1_idx` (`mediopago_idmediopago` ASC) VISIBLE,
  CONSTRAINT `fk_mediopago_has_venta_mediopago1`
    FOREIGN KEY (`mediopago_idmediopago`)
    REFERENCES `puntodeventa`.`mediopago` (`idmediopago`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mediopago_has_venta_venta1`
    FOREIGN KEY (`venta_idVenta` , `venta_tipoventa_idTipoVenta` , `venta_documentodeventa_idDocumentoDeVenta` , `venta_Cajero_idUsuario1` , `venta_Cliente_idUsuario`)
    REFERENCES `puntodeventa`.`venta` (`idVenta` , `tipoventa_idTipoVenta` , `documentodeventa_idDocumentoDeVenta` , `Cajero_idUsuario1` , `Cliente_idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`producto` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `nombreProducto` VARCHAR(300) NULL,
  `valorProducto` INT NULL,
  `cantidadProducto` INT NULL,
  `precioVentaProducto` INT NULL,
  `codigoBarraProducto` VARCHAR(300) NULL,
  `Estado_idEstado` INT NOT NULL,
  `Familia_idFamilia` INT NOT NULL,
  PRIMARY KEY (`idProducto`, `Estado_idEstado`, `Familia_idFamilia`),
  INDEX `fk_producto_estado1_idx` (`Estado_idEstado` ASC) VISIBLE,
  INDEX `fk_producto_familia1_idx` (`Familia_idFamilia` ASC) VISIBLE,
  CONSTRAINT `fk_producto_estado1`
    FOREIGN KEY (`Estado_idEstado`)
    REFERENCES `puntodeventa`.`estado` (`idEstado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_familia1`
    FOREIGN KEY (`Familia_idFamilia`)
    REFERENCES `puntodeventa`.`familia` (`idFamilia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`detalleventa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`detalleventa` (
  `idDetalleVenta` INT NOT NULL AUTO_INCREMENT,
  `cantidadDetalleVenta` INT NULL,
  `valorDetalleVenta` INT NULL,
  `Producto_idProducto` INT NOT NULL,
  `Producto_Estado_idEstado` INT NOT NULL,
  `Venta_idVenta` INT NOT NULL,
  PRIMARY KEY (`idDetalleVenta`, `Producto_idProducto`, `Producto_Estado_idEstado`, `Venta_idVenta`),
  INDEX `fk_detalleventa_producto1_idx` (`Producto_idProducto` ASC, `Producto_Estado_idEstado` ASC) VISIBLE,
  INDEX `fk_detalleventa_venta1_idx` (`Venta_idVenta` ASC) VISIBLE,
  CONSTRAINT `fk_detalleventa_producto1`
    FOREIGN KEY (`Producto_idProducto` , `Producto_Estado_idEstado`)
    REFERENCES `puntodeventa`.`producto` (`idProducto` , `Estado_idEstado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalleventa_venta1`
    FOREIGN KEY (`Venta_idVenta`)
    REFERENCES `puntodeventa`.`venta` (`idVenta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`documentocompra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`documentocompra` (
  `idDocumentoCompra` INT NOT NULL AUTO_INCREMENT,
  `nombreDocumentoCompra` VARCHAR(45) NULL,
  PRIMARY KEY (`idDocumentoCompra`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`compra` (
  `idCompra` INT NOT NULL AUTO_INCREMENT,
  `FechaCompra` DATETIME NULL,
  `FechaRegistroCompra` DATETIME NULL,
  `numeroDocumentoCompra` VARCHAR(300) NULL,
  `totalCompra` INT NULL,
  `impuestoCompra` INT NULL,
  `DocumentoCompra_idDocumentoCompra` INT NOT NULL,
  `Proveedor_idProveedor` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  `stockActualizado` VARCHAR(45) NULL,
  PRIMARY KEY (`idCompra`, `DocumentoCompra_idDocumentoCompra`, `Proveedor_idProveedor`, `Usuario_idUsuario`),
  INDEX `fk_compra_documentocompra1_idx` (`DocumentoCompra_idDocumentoCompra` ASC) VISIBLE,
  INDEX `fk_compra_proveedor1_idx` (`Proveedor_idProveedor` ASC) VISIBLE,
  INDEX `fk_compra_usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_compra_documentocompra1`
    FOREIGN KEY (`DocumentoCompra_idDocumentoCompra`)
    REFERENCES `puntodeventa`.`documentocompra` (`idDocumentoCompra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compra_proveedor1`
    FOREIGN KEY (`Proveedor_idProveedor`)
    REFERENCES `puntodeventa`.`proveedor` (`idProveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compra_usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `puntodeventa`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puntodeventa`.`detallecompra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puntodeventa`.`detallecompra` (
  `idDetalleCompra` INT NOT NULL AUTO_INCREMENT,
  `cantidadDetalleCompra` INT NULL,
  `valorDetalleCompra` INT NULL,
  `Compra_idCompra` INT NOT NULL,
  `Producto_idProducto` INT NOT NULL,
  `Producto_Estado_idEstado` INT NOT NULL,
  PRIMARY KEY (`idDetalleCompra`, `Compra_idCompra`, `Producto_idProducto`, `Producto_Estado_idEstado`),
  INDEX `fk_detallecompra_compra1_idx` (`Compra_idCompra` ASC) VISIBLE,
  INDEX `fk_detallecompra_producto1_idx` (`Producto_idProducto` ASC, `Producto_Estado_idEstado` ASC) VISIBLE,
  CONSTRAINT `fk_detallecompra_compra1`
    FOREIGN KEY (`Compra_idCompra`)
    REFERENCES `puntodeventa`.`compra` (`idCompra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detallecompra_producto1`
    FOREIGN KEY (`Producto_idProducto` , `Producto_Estado_idEstado`)
    REFERENCES `puntodeventa`.`producto` (`idProducto` , `Estado_idEstado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
