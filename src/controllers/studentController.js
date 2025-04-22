import Student from '../models/Student.js';

// Crear nuevo estudiante
export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener lista de estudiantes activos (excluye por defecto los retirados)
export const getStudents = async (req, res) => {
  try {
    // Combina filtros de consulta con el filtro de fechaRetiro nula
    const filters = { fechaRetiro: null, ...req.query };

    // Permite filtrar explícitamente por estudiantes activos
    if (filters.fechaRetiro === 'null') {
      filters.fechaRetiro = { $eq: null };
    }

    const students = await Student.find(filters);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un estudiante por ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar datos de un estudiante
export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Dar de baja un estudiante (marca fechaRetiro en lugar de eliminar)
export const deleteStudent = async (req, res) => {
  try {
    const dropped = await Student.findByIdAndUpdate(
      req.params.id,
      { fechaRetiro: new Date() },
      { new: true }
    );
    res.json(dropped);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
