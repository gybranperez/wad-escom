/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import com.google.gson.Gson;

public class Controlador extends HttpServlet {
    private Gson parser = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter p = response.getWriter();
        String opcion = request.getParameter("opcion");
        p.write(opcion);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter print = response.getWriter();
        response.setHeader("Access-Control-Allow-Origin","*");
        String op = "";
        op = request.getParameter("opcion");
        BaseDeDatos db = new BaseDeDatos();
        LoginBean log = new LoginBean();
        String idUsuario="";
        switch(op){
            case "login.usuario":
                String user=request.getParameter("usuario");
                String pass=request.getParameter("password");
                int id = log.validateUser(user, pass);
                System.out.println(id);
                if(id == -1){
                    print.print("0");
                }else{
                    String ids = String.valueOf(id);
                    request.getSession().setAttribute("id_usuario", ids);
                    print.print("1");
                }
                break;
            case "login.salir":
                try{
                    request.getSession().setAttribute("id_usuario", null);
                    print.print("0");
                }catch(Exception e){
                }
                
                break;
            case "pregunta.nueva":
                idUsuario = request.getSession().getAttribute("id_usuario").toString();
                String nombre= request.getParameter("nombre");
                String texto=request.getParameter("texto");
                String numIntentos=request.getParameter("numIntentos");
                String tipoPregunta=request.getParameter("tipoPregunta");
                String fpositivo=request.getParameter("fpositivo");
                String fnegativo=request.getParameter("fnegativo");
                String respuestas=request.getParameter("respuestas");
                Pregunta p = new Pregunta(nombre,texto,Integer.parseInt(numIntentos),Integer.parseInt(tipoPregunta),fnegativo,fpositivo,respuestas);
                db.altaPregunta(idUsuario, p);
                print.print("1");
                break;
            case "pregunta.lista":
                idUsuario = request.getSession().getAttribute("id_usuario").toString();
                List<Pregunta> preguntas = db.getPreguntasDeUsuario(idUsuario);
                String s = parser.toJson(preguntas);
                print.print(s);
                break;
            case "examen.nuevo":
                idUsuario = request.getSession().getAttribute("id_usuario").toString();
                String nombreExamen = request.getParameter("nombre");
                System.out.println("NEw examen "+nombreExamen       );
                db.altaExamen(idUsuario, nombreExamen);
                print.print("1");
                break;
            case "examen.baja":
                String idExamen = request.getParameter("idExamen");
                db.bajaExamen(idExamen);
                print.print("1");
                break;
            case "examen.lista":
                idUsuario = request.getSession().getAttribute("id_usuario").toString();
                List<Examen> examenes = db.GetExamenes(idUsuario);
                for(Examen ex : examenes){
                    List<Pregunta> preguntasExamen = db.getPreguntasExamen(ex.getID());
                    ex.setPreguntas(preguntasExamen);
                }
                print.print(parser.toJson(examenes));
                break;
            case "examen.pregunta.add":
                idExamen=request.getParameter("idExamen");
                String idPregunta=request.getParameter("idPregunta");
                db.altaPreguntasExamen(idExamen,idPregunta);
                print.print("1");
                break;
            case "examen.modificar":
                idExamen=request.getParameter("idExamen");
                String nombreEx=request.getParameter("nombre");
                db.modificarExamen(idExamen,nombreEx);
                print.print("1");
                break;
                
            case "pregunta.eliminar":
                idPregunta=request.getParameter("idPregunta");
                db.bajaPregunta(idPregunta);
                print.print("1");
                break;
            case "login.is":
                idUsuario = request.getSession().getAttribute("id_usuario").toString();
                if(idUsuario!=null){
                    print.print("1");
                }else{
                    print.print("0");
                }
                break;
            case "pregunta.modificar":
                String idP = request.getParameter("id");
                nombre= request.getParameter("nombre");
                texto=request.getParameter("texto");
                numIntentos=request.getParameter("numIntentos");
                tipoPregunta=request.getParameter("tipoPregunta");
                fpositivo=request.getParameter("fpositivo");
                fnegativo=request.getParameter("fnegativo");
                respuestas=request.getParameter("respuestas");
                p = new Pregunta(nombre,texto,Integer.parseInt(numIntentos),Integer.parseInt(tipoPregunta),fnegativo,fpositivo,respuestas);
                p.setID(Integer.parseInt(idP));
                db.modificarPregunta(p);
                print.print("1");
                break;
        }
    }
}
