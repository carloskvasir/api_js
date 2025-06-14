import Log from '../../models/Log.js';

// Lista todos os logs
export const index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Buscar logs com paginação
    const logsData = await Log.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .lean(); // Adicionar .lean() para retornar objetos JavaScript simples

    // Contar total de logs para paginação
    const totalLogs = await Log.countDocuments();
    const totalPages = Math.ceil(totalLogs / limit);

    // Converter dados para garantir compatibilidade com Handlebars
    const logs = logsData.map(log => ({
      ...log,
      _id: log._id.toString(),
      timestamp: log.timestamp || new Date(),
      action: log.action || 'UNKNOWN',
      table: log.table || 'unknown',
      record_id: log.record_id || 'unknown',
      user_ip: log.user_ip || 'unknown',
      user_agent: log.user_agent || 'unknown',
      details: log.details || {}
    }));

    res.render('logs/index', {
      title: 'Logs do Sistema',
      logs,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        from: ((page - 1) * limit) + 1,
        to: Math.min(page * limit, totalLogs),
        total: totalLogs
      }
    });
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    res.render('logs/index', {
      title: 'Logs do Sistema',
      logs: [],
      error: 'Erro ao carregar os logs. MongoDB pode não estar configurado corretamente.'
    });
  }
};

// Mostra detalhes de um log específico
export const show = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).render('logs/show', {
        title: 'Log Não Encontrado',
        error: 'Log não encontrado'
      });
    }

    res.render('logs/show', {
      title: `Log ${log.action} - ${log.table}`,
      log
    });
  } catch (error) {
    console.error('Erro ao buscar log:', error);
    res.status(500).render('logs/show', {
      title: 'Erro ao Carregar Log',
      error: 'Erro interno do servidor'
    });
  }
};

export default {
  index,
  show
};
