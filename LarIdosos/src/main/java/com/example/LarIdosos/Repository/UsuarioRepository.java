package com.example.LarIdosos.Repository;

import com.example.LarIdosos.Models.Enum.TipoUsuario;
import com.example.LarIdosos.Models.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByCpf(String cpf);

    @Query("{ 'nome': { $regex: ?0, $options: 'i' } }")
    List<Usuario> buscarPorNome(String nome);

    List<Usuario> findByQuarto(String quarto);

    List<Usuario> findByTipoUsuario(TipoUsuario tipoUsuario);
}