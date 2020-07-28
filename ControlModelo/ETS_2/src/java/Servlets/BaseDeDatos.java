/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author ertim
 */
public class BaseDeDatos {
    public BaseDeDatos(){
        
    }
    public void altaPregunta(String idUsuario,Pregunta p){
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                stmt.executeQuery("call createPregunta("+idUsuario+",'"+p.getNombre()+"','"+p.getTexto()+"',"+p.getNumIntentos()+","+p.getTipoPregunta()+",'"+p.getFnegativo()+"','"+p.getFpositivo()+"','"+p.getRespuestas()+"');");
            }
        }catch(ClassNotFoundException | SQLException e){
        }
    }
    public void modificarPregunta(Pregunta p){
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                System.out.println("call UpdatePregunta("+p.getID()+",'"+p.getNombre()+"','"+p.getTexto()+"',"+p.getNumIntentos()+","+p.getTipoPregunta()+",'"+p.getFnegativo()+"','"+p.getFpositivo()+"','"+p.getRespuestas()+"');");
                stmt.executeQuery("call UpdatePregunta("+p.getID()+",'"+p.getNombre()+"','"+p.getTexto()+"',"+p.getNumIntentos()+","+p.getTipoPregunta()+",'"+p.getFnegativo()+"','"+p.getFpositivo()+"','"+p.getRespuestas()+"');");
            }
        }catch(ClassNotFoundException | SQLException e){
        }
    }
    public void bajaPregunta(Pregunta p){
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                stmt.executeQuery("call deletePregunta("+p.getID()+");");
            }
        }catch(ClassNotFoundException | SQLException e){
        }
    }
    public List<Pregunta> getPreguntasDeUsuario(String idUsuario){
        List<Pregunta> preguntas= new ArrayList<>();
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                ResultSet rs = stmt.executeQuery("select * from pregunta where id_creador = "+idUsuario+";");
                while(rs.next()){
                    Pregunta p = new Pregunta(rs.getInt("id_pregunta"), rs.getString("nombre"), rs.getString("texto"), rs.getInt("no_intentos"),rs.getInt("tipo_pregunta"),rs.getString("f_negativo"),rs.getString("f_positivo"));
                    p.setRespuestas(rs.getString("respuestas"));
                    preguntas.add(p);
                }
            }
        }catch(ClassNotFoundException | SQLException e){
            e.printStackTrace();
        }
        return preguntas;
    }
    public void altaExamen(String idUsuario,String nombre){
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                stmt.executeQuery("call CreateExamen("+idUsuario+",'"+nombre+"');");
            }
        }catch(ClassNotFoundException | SQLException e){
            e.printStackTrace();
        }
    }
    public void altaPreguntaConExamen(String idExamen,String idPregunta){
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                stmt.executeQuery("call AddPreguntaExamen("+idExamen+","+idPregunta+");");
            }
        }catch(ClassNotFoundException | SQLException e){
            e.printStackTrace();
        }
    }
    public List<Examen> GetExamenes(String idUsuario){
        List<Examen> examenes= new ArrayList<>();
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                stmt.executeQuery("call GetExamenesDeUsuario("+idUsuario+");");
                ResultSet rs = stmt.executeQuery("call GetExamenesDeUsuario("+idUsuario+");");
                while(rs.next()){
                    examenes.add(new Examen(rs.getInt("id_examen"),rs.getString("nombre")));
                }
            }
        }catch(ClassNotFoundException | SQLException e){
            e.printStackTrace();
        }
        return examenes;
    }
    public void altaPreguntasExamen(String idExamen,String idPregunta){
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                stmt.executeQuery("call AddPreguntaExamen("+idExamen+","+idPregunta+");");
            }
        }catch(ClassNotFoundException | SQLException e){
            e.printStackTrace();
        }
    }
    public List<Pregunta> getPreguntasExamen(int idExamen){
        List<Pregunta> preguntas =new ArrayList<>();
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                ResultSet rs =stmt.executeQuery("select pregunta.id_pregunta,nombre,texto,no_intentos,f_positivo,f_negativo,tipo_pregunta,respuestas from cat_examen inner join pregunta where cat_examen.id_pregunta=pregunta.id_pregunta and cat_examen.id_examen="+idExamen+";");
                while(rs.next()){
                    Pregunta p = new Pregunta(rs.getInt("id_pregunta"), rs.getString("nombre"), rs.getString("texto"), rs.getInt("no_intentos"),rs.getInt("tipo_pregunta"),rs.getString("f_negativo"),rs.getString("f_positivo"));
                    p.setRespuestas(rs.getString("respuestas"));
                    preguntas.add(p);
                }
            }
        }catch(ClassNotFoundException | SQLException e){
            e.printStackTrace();
        }
        return preguntas;
    }
    public void bajaPregunta(String idPregunta){
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                stmt.executeQuery("call DeletePregunta("+idPregunta+");");
            }
        }catch(ClassNotFoundException | SQLException e){
            e.printStackTrace();
        }
    }
    public void bajaExamen(String idExamen){
        try{  
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                stmt.executeQuery("call DeleteExamen("+idExamen+");");
            }
        }catch(ClassNotFoundException | SQLException e){
            e.printStackTrace();
        }
    }
    
    public void modificarExamen(String idExamen,String nombre){
        try{
            Class.forName("com.mysql.jdbc.Driver");  
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/wad","root","2312")) {
                Statement stmt=(Statement) con.createStatement();
                stmt.executeQuery("call UpdateExamen("+idExamen+",'"+nombre+"');");
            }
        }catch(ClassNotFoundException | SQLException e){
            e.printStackTrace();
        }
    }
}
