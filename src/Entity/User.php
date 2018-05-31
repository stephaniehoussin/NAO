<?php

namespace App\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="nao_user")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;
    /**
     * @var string $lastname
     * @ORM\Column(name="usr_lastname", type="string", length=100, nullable=true)
     * @Assert\NotBlank(message="Merci de saisir votre nom")
     * @Assert\Length(
     *     min=3,
     *     max=100,
     *     minMessage="Votre saisie est trop courte",
     *     maxMessage="votre saisie est trop longue"
     * )
     */
    private $lastname;
    /**
     * @var string $firstname
     * @ORM\Column(name="usr_firstname", type="string", length=100, nullable=true)
     * @Assert\NotBlank(message="Merci de saisir votre prénom")
     * @Assert\Length(
     *     min=3,
     *     max=100,
     *     minMessage="Votre saisie est trop courte",
     *     maxMessage="votre saisie est trop longue"
     * )
     */
    private $firstname;
    /**
     * @var \DateTime $birth
     * @ORM\Column(name="usr_birth", type="datetime", nullable=true)
     * @Assert\NotBlank()
     * @Assert\LessThan(
     *     "today",
     *     message = "merci de vérifier la date de naissance"
     * )
     *
     */
    private $birth;
    /**
     * @ORM\OneToMany(targetEntity="Observations", mappedBy="user")
     */
    private $observations;
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Badge", mappedBy="user")
     */
    private $badges;
    /**
     * User constructor.
     */

    /**
     * 0 = admin, 1 = naturalist, 2 = regular
     * @ORM\Column(type="integer")
     * @Assert\Range(
     *      min = 0,
     *      max = 2
     * )
     */
    private $role;

    public function __construct()
    {
        parent::__construct();
        $this->observations = new ArrayCollection();
        $this->badges = new ArrayCollection();
        $this->setRole(2);
    }
    /**
     * @return null|string
     */
    public function getLastname(): ?string
    {
        return $this->lastname;
    }
    /**
     * @param string $lastname
     * @return User
     */
    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;
        return $this;
    }
    /**
     * @return null|string
     */
    public function getFirstname(): ?string
    {
        return $this->firstname;
    }
    /**
     * @param string $firstname
     * @return User
     */
    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;
        return $this;
    }
    /**
     * @return \DateTimeInterface|null
     */
    public function getBirth(): ?\DateTimeInterface
    {
        return $this->birth;
    }
    /**
     * @param \DateTimeInterface $birth
     * @return User
     */
    public function setBirth(\DateTimeInterface $birth): self
    {
        $this->birth = $birth;
        return $this;
    }
    /**
     * @return Collection|Observations[]
     */
    public function getObservation() : Collection
    {
        return $this->observations;
    }

    public function addObservations(Observations $observation)
    {
        $this->observations[] = $observation;
        $observation->setUser($this);
    }
    public function removeObservation(Observations $observation)
    {
        $this->observations->removeElement($observation);
    }

    /**
     * @return Collection|Badge[]
     */
    public function getBadges(): Collection
    {
        return $this->badges;
    }

    public function addBadge(Badge $badge): self
    {
        $this->badges[] = $badge;
        $badge->setUser($this);
    }

    public function removeBadge(Badge $badge): self
    {
        $this->badges->removeElement($badge);
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): self
    {
        $this->role = $role;
        return $this;
    }
}