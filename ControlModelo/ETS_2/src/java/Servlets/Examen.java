package Servlets;


import Servlets.Pregunta;
import java.util.ArrayList;
import java.util.List;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ertim
 */
public class Examen {
    private int ID;
    private String nombre;
    private List<Pregunta> preguntas;

    public Examen(String nombre,ArrayList<Pregunta> preguntas){
        this.nombre = nombre;
        this.preguntas= preguntas;
    }
    
    public Examen(int id ,String nombre){
        this.nombre = nombre;
        this.ID= id;
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

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }


    public void setPreguntas(ArrayList<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }
    
}
