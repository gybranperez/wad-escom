package Servlets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class LoginBean 
{
    public LoginBean()
    {
    }
    
    public int validateUser(String username, String password)
    {
        Connection con = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            ResultSet rs=null;
            con= DriverManager.getConnection("jdbc:mysql://localhost:3306/wad", "root", "2312");
            Statement s = con.createStatement();
            System.out.println("call GetIdUsuario('"+username+"','"+password+"');");
            rs=s.executeQuery("call GetIdUsuario('"+username+"','"+password+"');");
            while(rs.next()){
                return rs.getInt("id_usuario");
            }
        }catch (SQLException e) {
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(LoginBean.class.getName()).log(Level.SEVERE, null, ex);
        }
        return -1;
    }
}