import bcrypt from 'bcrypt';
import { User } from '../../models/index.js';

export const index = async (req, res) => {
  try {
    const users = await User.findAll();
    const plainUsers = users.map(user => ({
      ...user.get({ plain: true }),
      viewUrl: `/users/${user.id}`,
      editUrl: `/users/${user.id}/edit`,
      deleteUrl: `/users/${user.id}`
    }));
    res.render('users/index', {
      title: 'Usuários',
      users: plainUsers });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const show = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).render('shared/error', { error: 'Usuário não encontrado' });
    }
    const plainUser = user.get({ plain: true });
    res.render('users/show', { title: plainUser.name, user: plainUser });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const create = (req, res) => {
  res.render('users/new', { title: 'Novo Usuário' });
};

export const store = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect('/users');
  } catch (error) {
    res.status(400).render('users/new', {
      title: 'Novo Usuário',
      error: error.message,
      data: req.body
    });
  }
};

export const edit = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).render('shared/error', { error: 'Usuário não encontrado' });
    }
    const plainUser = user.get({ plain: true });
    res.render('users/edit', { title: 'Editar Usuário', user: plainUser });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).render('shared/error', { error: 'Usuário não encontrado' });
    }

    const { currentPassword, newPassword, confirmPassword, ...updateData } = req.body;

    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        throw new Error('Senha atual é necessária para alterações');
      }

      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        throw new Error('Senha atual incorreta');
      }

      if (!newPassword || !confirmPassword) {
        throw new Error('Preencha todos os campos de senha');
      }
      if (newPassword !== confirmPassword) {
        throw new Error('As senhas não coincidem');
      }
      if (newPassword.length < 6) {
        throw new Error('A nova senha deve ter pelo menos 6 caracteres');
      }

      updateData.password = newPassword;
    }

    await user.update(updateData);
    res.redirect('/users/' + req.params.id);
  } catch (error) {
    res.status(400).render('users/edit', {
      title: 'Editar Usuário',
      user: { ...req.body, id: req.params.id },
      error: error.message
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).render('shared/error', { error: 'Usuário não encontrado' });
    }
    await user.destroy();
    res.redirect('/users');
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};