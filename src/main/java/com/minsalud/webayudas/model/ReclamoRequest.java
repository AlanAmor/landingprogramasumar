package com.minsalud.webayudas.model;

public class ReclamoRequest {
    private String nombreCompleto;
    private String cargo;
    private String celular;
    private String email;
    private String efectorSalud;
    private String cuie;
    private String problematica;

    // Constructores
    public ReclamoRequest() {
    }

    public ReclamoRequest(String nombreCompleto, String cargo, String celular, String email, 
                         String efectorSalud, String cuie, String problematica) {
        this.nombreCompleto = nombreCompleto;
        this.cargo = cargo;
        this.celular = celular;
        this.email = email;
        this.efectorSalud = efectorSalud;
        this.cuie = cuie;
        this.problematica = problematica;
    }

    // Getters y Setters
    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEfectorSalud() {
        return efectorSalud;
    }

    public void setEfectorSalud(String efectorSalud) {
        this.efectorSalud = efectorSalud;
    }

    public String getCuie() {
        return cuie;
    }

    public void setCuie(String cuie) {
        this.cuie = cuie;
    }

    public String getProblematica() {
        return problematica;
    }

    public void setProblematica(String problematica) {
        this.problematica = problematica;
    }
}

