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

    Optional<Usuario> findByNome(String nome);

    Optional<Usuario> findByNomeAndCpf(String nome, String cpf);

    List<Usuario> findByTipoUsuario(TipoUsuario tipoUsuario);
}