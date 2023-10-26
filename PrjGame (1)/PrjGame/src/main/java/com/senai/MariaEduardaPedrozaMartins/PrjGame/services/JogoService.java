package com.senai.MariaEduardaPedrozaMartins.PrjGame.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.MariaEduardaPedrozaMartins.PrjGame.entities.Jogo;
import com.senai.MariaEduardaPedrozaMartins.PrjGame.repository.JogoRepository;

@Service
public class JogoService {
	private final JogoRepository jogoRepository;
@Autowired
	public JogoService(JogoRepository jogoRepository) {
		this.jogoRepository = jogoRepository;
	}

	public Jogo saveJogo(Jogo jogo) {
		return jogoRepository.save(jogo);
	}

	public Jogo getJogoById(Long id) {
		return jogoRepository.findById(id).orElse(null);

	}

	public List<Jogo> getAllJogo() {
		return jogoRepository.findAll();
	}

	public void deleteJogo(Long id) {
		jogoRepository.deleteById(id);
	}

	// fazendo o update do jogo com o optional
	public Jogo updateJogo(Long id, Jogo novoJogo) {
		Optional<Jogo> jogoOptional = jogoRepository.findById(id);
		if (jogoOptional.isPresent()) {
			Jogo jogoExistente = jogoOptional.get();
			jogoExistente.setName(novoJogo.getName());
			jogoExistente.setPlataforma(novoJogo.getPlataforma());
			return jogoRepository.save(jogoExistente);
		} else {
			return null;
		}
	}

}
