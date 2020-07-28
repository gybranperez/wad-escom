package Servlets;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ertim
 */
public class Pregunta {
    private int ID;
    private String nombre;
    private String texto;
    private int numIntentos;
    private int tipoPregunta;
    private String fpositivo;
    private String fnegativo;
    private String respuestas;
    
    public Pregunta(String nombre, String texto, int numIntentos,int tipoPregunta, String fnegativo,String fpositivo,String respuestas){
        this.nombre = nombre;
        this.texto = texto;
        this.numIntentos= numIntentos;
        this.tipoPregunta= tipoPregunta;
        this.fnegativo=fnegativo;
        this.fpositivo=fpositivo;
        this.respuestas=respuestas;
    }

    public String getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(String respuestas) {
        this.respuestas = respuestas;
    }
    
    public Pregunta(int id , String nombre, String texto, int numIntentos,int tipoPregunta, String fnegativo,String fpositivo){
        this.ID=id;
        this.nombre = nombre;
        this.texto = texto;
        this.numIntentos= numIntentos;
        this.tipoPregunta= tipoPregunta;
        this.fnegativo=fnegativo;
        this.fpositivo=fpositivo;
    }
    
    public Pregunta(int id , String nombre, String texto, int numIntentos,int tipoPregunta){
        this.ID=id;
        this.nombre = nombre;
        this.texto = texto;
        this.numIntentos= numIntentos;
        this.tipoPregunta= tipoPregunta;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public int getNumIntentos() {
        return numIntentos;
    }

    public void setNumIntentos(int numIntentos) {
        this.numIntentos = numIntentos;
    }


    public int getTipoPregunta() {
        return tipoPregunta;
    }

    public void setTipoPregunta(int tipoPregunta) {
        this.tipoPregunta = tipoPregunta;
    }

    public String getFpositivo() {
        return fpositivo;
    }

    public void setFpositivo(String fpositivo) {
        this.fpositivo = fpositivo;
    }

    public String getFnegativo() {
        return fnegativo;
    }

    public void setFnegativo(String fnegativo) {
        this.fnegativo = fnegativo;
    }

    
    
    
}
